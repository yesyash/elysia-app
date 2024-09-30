import { swagger } from "@elysiajs/swagger"
import { Elysia, error, t } from "elysia"

class Notes {
  public data: string[] = []

  constructor(data: string[] = ["Note 1", "Note 2", "Note 3"]) {
    this.data = data
  }

  public add(note: string) {
    this.data.push(note)
  }

  public edit(index: number, note: string) {
    this.data[index] = note
  }
}

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .decorate("notes", new Notes())
  .get("/notes", ({ notes }) => notes.data)
  .get(
    "/notes/:index",
    ({ notes, params: { index } }) => {
      const note = notes.data[index]
      if (!note) {
        return error(404, { message: "Note not found" })
      }

      return { data: note }
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
    },
  )
  .post(
    "/notes",
    ({ notes, body }) => {
      notes.add(body.note)
      return notes.data
    },
    {
      body: t.Object({
        note: t.String(),
      }),
    },
  )
  .patch(
    "/notes/:index",
    ({ notes, params: { index }, body }) => {
      if (!notes.data[index]) {
        return error(404, { message: "Note not found" })
      }

      notes.edit(index, body.note)
      return notes.data
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
      body: t.Object({
        note: t.String(),
      }),
    },
  )
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
