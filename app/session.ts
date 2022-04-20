import { createCookieSessionStorage } from "remix"

import cookie from "./cookie"

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({ cookie })

export { getSession, commitSession, destroySession }
