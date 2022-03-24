import connect from "~/database/mongoConnection"
import { createContext } from "react"
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix"

import styles from "../styles/snippets.css"

export type SnippetType = {
  _id: string
  language: string
  description: string
  snippet: string
  title: string
  favorite: boolean
}

type LoaderDataType = { query: SnippetType[]; params: { snippet: string } }

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ params }) => {
  const db = await connect()

  // Find all snippets with the language specified in the URL
  const query = await db.models.Snippets.find({ language: params.language })

  return { params, query }
}

export const SnippetContext = createContext<SnippetType>({} as SnippetType)

export default function Snippets() {
  const { query: snippets } = useLoaderData<LoaderDataType>()
  // const snippet = snippets.find((snippet) => snippet._id === params.snippet)
  // console.log("snippet: ", snippet)

  return (
    // <SnippetContext.Provider value={snippet}>
    <section className="snippet-grid">
      <div className="snippet-list">
        {snippets.map((snippet) => (
          <Link key={snippet._id} to={`${snippet.language}/${snippet._id}`}>
            <div className="snippet-list-item">
              <p className="description">{snippet.description}</p>
              <p className="short-snippet">{snippet.snippet}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="seperator"></div>
      <Outlet />
    </section>
    // </SnippetContext.Provider>
  )
}
