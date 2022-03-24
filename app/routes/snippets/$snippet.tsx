import connect from "~/database/mongoConnection"
import { LoaderFunction, useLoaderData } from "remix"

// export const loader: LoaderFunction = async ({ params }) => {
//   console.log("params: ", params)
//   const db = await connect()

//   const query = await db.models.Snippets.find({ _id: params.snippet })

//   return query
// }

export default function Snippet() {
  // const snippet = useLoaderData()
  // console.log("snippet: ", snippet)

  return (
    <section className="snippet-section">
      <h2>Function for logging outputs of statemnets</h2>
      <code>
        <pre>console.log()</pre>
      </code>
      <footer>
        <button className="btn warning">Delete snippet</button>
        <button className="btn">Edit snippet</button>
      </footer>
    </section>
  )
}
