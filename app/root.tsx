import connect from "~/database/mongoConnection"
import React from "react"
import { useLocation } from "react-router"
import {
  ActionFunction,
  ErrorBoundaryComponent,
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

import highlightStylesLight from "./styles/github.min.css"
import styles from "./styles/main.css"
import newpage from "./styles/new.css"
import search from "./styles/search.css"
import seed from "./styles/seed.css"
import snippetCard from "./styles/snippet-card.css"
import snippets from "./styles/snippets.css"

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: highlightStylesLight },
    { rel: "stylesheet", href: search },
    { rel: "stylesheet", href: snippetCard },
    { rel: "stylesheet", href: snippets },
    { rel: "stylesheet", href: newpage },
    { rel: "stylesheet", href: seed },
  ]
}

export async function loader(): Promise<string[]> {
  const db = await connect()
  const languages = await db.models.Snippets.find().distinct("language")
  return languages
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  return redirect(`snippets/search?q=${formData.get("search")}`)
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
  const location = useLocation()

  return (
    <>
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
          {/* TODO: create an all snippets page */}
          <Link
            to={`/snippets/all`}
            className={
              new RegExp(`/all`).test(location.pathname) ? "active" : ""
            }
          >
            all languages
          </Link>
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
      <main>{children}</main>
    </>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Document>
      <Layout>
        <h1>Oh no!, Nothing Works</h1>
      </Layout>
    </Document>
  )
}
