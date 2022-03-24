import connect from "~/database/mongoConnection"
import React from "react"
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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
  return (
    <main>
      <aside className="aside-nav">
        <header>
          <h1>Snippets</h1>
        </header>
        <nav>
          {languages.map((language) => (
            <Link
              key={language}
              to={`/snippets/${language}`} /* style={styles.asideTab} */
            >
              {language}
            </Link>
          ))}
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
