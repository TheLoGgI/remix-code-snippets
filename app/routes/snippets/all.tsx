import SnippetCard from "~/components/snippetCard"
import connect from "~/database/mongoConnection"
import { SnippetType } from "~/types"
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useFetcher,
  useLoaderData,
  useLocation,
} from "remix"

type LoaderDataType = { query: SnippetType[]; params: { snippet: string } }

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const actionType = formData.get("_action")
  const sortId = formData.get("sort")
  const pathname = formData.get("pathname")

  if (actionType === "sort") {
    switch (sortId) {
      case "upd":
        return redirect(`${pathname}?sort=updatedAt`)
      case "fav":
        return redirect(`${pathname}?sort=favorite`)
      default:
        return redirect(`${pathname}?sort=title`)
    }
  }
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url)
  const sortQury = url.searchParams.get("sort") || "title"

  const db = await connect()

  const sortObject = {
    [sortQury]: 1,
  }
  // Find all snippets with the language specified in the URL
  const query = await db.models.Snippets.find().sort(sortObject)

  // Catch error and sent to CatchBoundary
  if (query.length === 0 || !query) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "No snippets found",
    })
  }

  return { params, query }
}

export default function All() {
  const { query: snippets } = useLoaderData<LoaderDataType>()
  const fetcher = useFetcher()
  const location = useLocation()

  return (
    <section className="snippet-grid">
      <div className="snippets-view">
        <header>
          <h2>Snippets of languages</h2>
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
              <option value="upd">Last updated</option>
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
