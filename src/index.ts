import { swagger } from "@elysiajs/swagger"
import { Elysia } from "elysia"
import { notes } from "./note"

const app = new Elysia()
  .onTransform(function log({ body, params, path, request: { method } }) {
    console.log(`${method} ${path}`, {
      body,
      params,
    })
  })
  .use(swagger())
  .use(notes)
  .get("/", () => "Hello Elysia")
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
