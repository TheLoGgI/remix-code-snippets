import SnippetCard from "~/components/snippetCard"
import connect from "~/database/mongoConnection"
import { LoaderFunction, redirect, useLoaderData } from "remix"

import styles from "../styles/search.css"
import { SnippetType } from "./snippets"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

// export const action: ActionFunction = async ({ request }) => {
//   const db = await connect()
//   console.log("request: ", request)
//   const formData = await request.formData()
//   console.log("formData: ", formData)
//   console.log("formData.get(: ", formData.get("id"))
//   console.log("formData.get(: ", formData.get("redirectTo"))

//   await db.models.Snippets.findByIdAndRemove(formData.get("id"))
//   const redirectTo = formData.get("redirectTo") || "/snippets"
//   return redirect(redirectTo as string)
// }

export const loader: LoaderFunction = async ({ request }) => {
  const db = await connect()
  const url = new URL(request.url)
  const urlQuery = url.searchParams.get("q")

  // Search for titles or descriptions that contain the query
  const language = await db.models.Snippets.find({ language: urlQuery })
  const title = await db.models.Snippets.find({ title: /urlQuery/gi })
  //  TODO: Implement this with mongo agregate query / Atlas Search

  return [...language, ...title]

  // const pipeline = db.models.Snippets.aggregate().match({ language: 1 })
  // console.log('pipeline: ', pipeline);
  // const res = await db.models.Snippets.aggregate().search({
  //   text: {
  //     query: `${urlQuery}`,
  //     path: {
  //       wildcard: "*",
  //     },
  //   },
  // })

  // const queryResponse = await db.models.Snippets.find({
  //   // _id: urlQuery,
  //   language: urlQuery,
  //   // title: urlQuery,
  //   // description: urlQuery,
  //   // snippet: urlQuery,
  // })
}

export default function Index() {
  const snippets = useLoaderData<SnippetType[]>()

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
