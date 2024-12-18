export const printFunction = (message: string, ...rest: string[]) => {
  if (JSON.parse(Deno.env.get("ENABLE_LOGGER") || "false")) {
    console.log(message, ...rest);
  }
};
