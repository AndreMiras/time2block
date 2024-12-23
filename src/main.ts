import { createApp } from "./app.ts";

const version = Deno.env.get("VERSION") || "1.0.0";
console.log({ version });
const app = createApp(version);
Deno.serve(app.fetch);
