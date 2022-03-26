import connect from "~/database/mongoConnection"
import React from "react"
import { useLocation } from "react-router"
import {
  ActionFunction,
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
  useLoaderData,
} from "remix"
import type { MetaFunction } from "remix"

import styles from "./styles/main.css"

export async function loader(): Promise<string[]> {
  const db = await connect()
  const languages = await db.models.Snippets.find().distinct("language")
  return languages
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  return redirect(`?q=${formData.get("search")}`)
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

const Document: React.FC = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ boxSizing: "border-box", margin: 0 }}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

const Layout: React.FC = ({ children }) => {
  const languages = useLoaderData<string[]>() || []
  // window.location.pathname not not valid in this context
  const location = useLocation()

  return (
    <main>
      <aside className="aside-nav">
        <header>
          <h1>Snippets</h1>
        </header>
        <Form className="aside-search" method="post">
          <div className="input-search">
            <img
              src="/assets/magnifying-glass.svg"
              alt="magnifying glass"
              aria-label="search"
              width="20"
              height="20"
            />
            <input type="search" name="search" placeholder="search.." />
          </div>
        </Form>
        <nav>
          {languages.map((language) => {
            return (
              <Link
                key={language}
                to={`/snippets/${language}`}
                className={
                  new RegExp(`/${language}`).test(location.pathname)
                    ? "active"
                    : ""
                }
              >
                {language}
              </Link>
            )
          })}
        </nav>
        <footer>
          <Link to="/new" className="btn">
            Add Snippet
          </Link>
        </footer>
      </aside>
      {children}
    </main>
  )
}
