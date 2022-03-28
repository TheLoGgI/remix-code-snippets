import SnippetCard from "~/components/snippetCard"
import connect from "~/database/mongoConnection"
import React, { useEffect } from "react"
import {
  ActionFunction,
  Form,
  LoaderFunction,
  Outlet,
  redirect,
  useFetcher,
  useLoaderData,
  useLocation,
} from "remix"

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const actionType = formData.get("_action")
  const sortId = formData.get("sort")
  const pathname = formData.get("pathname")

  if (actionType === "sort") {
    switch (sortId) {
      case "fav":
        return redirect(`${pathname}?sort=favorite`)
      default:
        return redirect(`${pathname}?sort=title`)
    }
  }
}

export const loader: LoaderFunction = async ({ params, request }) => {
  console.log("request: ", request)
  const url = new URL(request.url)
  const sortQury = url.searchParams.get("sort")
  console.log("sortQury: ", sortQury)

  const db = await connect()

  // Find all snippets with the language specified in the URL
  const query = await db.models.Snippets.find({
    language: params.language,
  }).sort(sortQury === "title" ? { title: 1 } : { favorite: 1 })

  return { params, query }
}

export default function Snippets() {
  const { query: snippets } = useLoaderData<LoaderDataType>()
  console.log("snippets: ", snippets)
  const fetcher = useFetcher()
  // const [snippetsState, setSnippetState] = React.useState<SnippetType[]>(snippets)
  const location = useLocation()
  console.log("location: ", location)

  // useEffect(() => {
  //   console.log("fetcher: ", fetcher)
  //   // if (fetcher.submission) {
  //   // const sortType = fetcher.submission?.formData.get('sort')
  //   fetcher.submit(fetcher.data, {
  //     method: "post",
  //   })
  //   fetcher.load(location.pathname)

  //   // }
  // }, [fetcher, location.pathname])

  return (
    <section className="snippet-grid">
      <div className="snippets-view">
        <header>
          <h2>{snippets[0].language}</h2>
          <fetcher.Form method="post" className="sortForm">
            <select
              title="sort snippets"
              name="sort"
              id="sort"
              className="sort-select"
            >
              <option value="" selected hidden>
                Sort Snippets
              </option>
              <option value="tit">Title</option>
              <option value="fav">Favorite</option>
            </select>
            <input type="hidden" name="pathname" value={location.pathname} />
            <input className="btn" type="submit" name="_action" value="sort" />
          </fetcher.Form>
        </header>
        <div className="snippet-list">
          {snippets.map((snippet) => {
            return (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                selected={new RegExp(snippet._id).test(location.pathname)}
              />
            )
          })}
        </div>
      </div>
      <div className="seperator"></div>
      <Outlet />
    </section>
  )
}
