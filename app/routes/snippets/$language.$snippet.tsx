import connect from "~/database/mongoConnection"
import { LoaderFunction, useLoaderData } from "remix"

import { SnippetType } from "../snippets"

export const loader: LoaderFunction = async ({ params }) => {
  const db = await connect()

  const query = await db.models.Snippets.findOne({ _id: params.snippet })

  return query
}

export default function Snippet() {
  const snippet = useLoaderData<SnippetType>()
  console.log("snippet: ", snippet)

  return (
    <section className="snippet-section">
      <h2>{snippet.title}</h2>
      <p>{snippet.description}</p>
      <code>
        <pre>{snippet.snippet}</pre>
      </code>
      <footer>
        <button className="btn warning">Delete snippet</button>
        <button className="btn">Edit snippet</button>
      </footer>
    </section>
  )
}
