import { swagger } from "@elysiajs/swagger"
import { Elysia } from "elysia"
import { notes } from "./note"

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .use(notes)
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
