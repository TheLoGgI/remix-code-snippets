import SnippetCard from "~/components/snippetCard"
import connect from "~/database/mongoConnection"
import { LoaderFunction, redirect, useLoaderData } from "remix"

import styles from "../styles/search.css"
import { SnippetType } from "./snippets"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ request }) => {
  const db = await connect()
  const url = new URL(request.url)
  const urlQuery = url.searchParams.get("q") || ""

  // Search for titles or descriptions that contain the query
  const language = await db.models.Snippets.find({
    language: new RegExp(urlQuery, "i"),
  })
  const title = await db.models.Snippets.find({
    title: new RegExp(urlQuery, "i"),
  })
  //  TODO: Implement this with mongo agregate query / Atlas Search

  return [...language, ...title]
}

export default function Index() {
  const snippets = useLoaderData<SnippetType[]>()
  console.log("snippets: ", snippets)

  return (
    <section className="search-results">
      <header>
        <h2>Search results</h2>
      </header>

      {snippets.length === 0 ? (
        <p>No snippets found</p>
      ) : (
        <div className="snippet-list">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              to={`./snippets/${snippet.language}/${snippet._id}`}
            />
          ))}
        </div>
      )}
    </section>

    // <section>
    //   {snippets.map((snippet) => (
    //     <SnippetCard key={snippet._id} snippet={snippet} />
    //   ))}
    // </section>
  )
}
