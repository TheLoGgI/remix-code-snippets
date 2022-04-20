import { createCookie } from "remix"

export default createCookie("__session", {
  // all of these are optional defaults that can be overridden at runtime
  // domain: "remix.run",
  // expires: new Date(Date.now() + 60_000),
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  // path: "/",
  // sameSite: "lax",
  // secrets: ["s3cret1"],
  // secure: true,
})
