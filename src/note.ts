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

  public delete(index: number) {
    this.data.splice(index, 1)
  }
}

export const notes = new Elysia().decorate("notes", new Notes()).group("/notes", (app) =>
  app
    .get("/", ({ notes }) => notes.data)
    .get(
      "/:index",
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
      "/",
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
      "/:index",
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
    .delete(
      "/:index",
      ({ notes, params: { index } }) => {
        if (!notes.data[index]) {
          return error(404, { message: "Note not found" })
        }

        notes.delete(index)
        return { message: "Note deleted" }
      },
      { params: t.Object({ index: t.Number() }) },
    ),
)
