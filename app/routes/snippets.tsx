import SnippetCard from "~/components/snippetCard"
import connect from "~/database/mongoConnection"
import { createContext } from "react"
import { Link, LoaderFunction, Outlet, useLoaderData, useLocation } from "remix"

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
  const location = useLocation()
  console.log("%c Location:", "color:yellow; font-weight: bold;", location)
  console.log("%c Snippets:", "color:dodgerblue; font-weight: bold;", snippets)

  return (
    <section className="snippet-grid">
      <div className="snippet-list">
        {snippets.map((snippet) => {
          console.log(
            "%c Selected:",
            "color:lightgreen; font-weight: bold;",
            new RegExp(snippet._id).test(location.pathname)
          )

          return (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              selected={new RegExp(snippet._id).test(location.pathname)}
            />
          )
        })}
      </div>
      <div className="seperator"></div>
      <Outlet />
    </section>
  )
}
