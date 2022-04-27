// import sessionCookie from "~/cookie"
import { commitSession, getSession } from "~/session"
import React from "react"
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix"

import styles from "../styles/login.css"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const action: ActionFunction = async ({ request }) => {
  const cookieSession = await getSession(request.headers.get("Cookie"))

  cookieSession.set("userId", "1234")

  return redirect(`/login/`, {
    status: 302,
    headers: {
      "Set-Cookie": await commitSession(cookieSession),
    },
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieSession = await getSession(request.headers.get("Cookie"))

  return cookieSession.get("userId")
}

export default function New() {
  const cookies = useLoaderData<string>()
  console.log("%c cookie: ", "color: gold;", cookies)

  React.useEffect(() => {
    console.log("%c cookies: ", "color: lime;", document.cookie)
  }, [])

  return (
    <section className="signin center">
      <pre>{JSON.stringify(cookies, null, 2)}</pre>
      <Form method="post" reloadDocument>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value="" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value="" />
        <input type="submit" value="reload page" />
      </Form>
    </section>
  )
}
