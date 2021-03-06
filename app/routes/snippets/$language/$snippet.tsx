import ClipboardIcon from "~/components/clipboardIcon"
import EmptyState from "~/components/emptyState"
import StarIcon from "~/components/starIcon"
import connect from "~/database/mongoConnection"
import { SnippetType } from "~/types"
import { useEffect, useState } from "react"
import Highlight from "react-highlight"
import {
  ActionFunction,
  ErrorBoundaryComponent,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useCatch,
  useLoaderData,
} from "remix"

export const action: ActionFunction = async ({ request }) => {
  const db = await connect()
  const formData = await request.formData()
  const actionType = formData.get("_action")
  const snippetId = formData.get("id")
  const isFavorited = formData.get("favorite")

  switch (actionType) {
    case "favorite":
      const updatedSnippet = await db.models.Snippets.findByIdAndUpdate(
        snippetId,
        { favorite: isFavorited === "true" ? false : true }
      )

      try {
        await updatedSnippet.save()
      } catch (error) {
        return redirect(`?erorr=${error}`)
      }
      return null
    case "delete":
      await db.models.Snippets.findByIdAndRemove(snippetId)
      const redirectTo = formData.get("redirectTo") || "/snippets"
      return redirect(redirectTo as string)

    default:
      return null
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const db = await connect()

  const query = await db.models.Snippets.findOne({ _id: params.snippet })

  // Catch error and sent to CatchBoundary
  if (query.length === 0) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "No snippets found for this language",
    })
  }
  return query
}

export default function Snippet() {
  const snippet = useLoaderData<SnippetType>()
  const [showCopy, setShowCopy] = useState(false)

  useEffect(() => {
    setShowCopy(true)
  }, [])

  return (
    <section className="snippet-section">
      <header>
        <div>
          <h2>{snippet.title}</h2>
          <p>{snippet.description}</p>
        </div>
        <Form method="post" className="form-favorite">
          <input type="hidden" name="id" value={snippet._id} />
          <input
            type="hidden"
            name="favorite"
            value={snippet.favorite?.toString()}
          />
          <button type="submit" name="_action" value="favorite">
            <StarIcon isFavorited={snippet.favorite} />
          </button>
        </Form>
      </header>
      <div className="snippet-date">
        {snippet.createdAt &&
          `created at: ${new Date(
            snippet.createdAt
          ).toLocaleDateString()}`}{" "}
        {snippet.updatedAt &&
          `updated at: ${new Date(snippet.updatedAt).toLocaleDateString()}`}
      </div>
      <div className="code-snippet">
        {showCopy && (
          <div
            className="clipboard-banner"
            title="Copy to Clipboard"
            onClick={() => {
              navigator.clipboard.writeText(snippet.snippet)
            }}
          >
            <ClipboardIcon />
          </div>
        )}

        <Highlight className={snippet.language}>{snippet.snippet}</Highlight>
      </div>
      <footer>
        <Form method="post">
          <input type="hidden" name="id" value={snippet._id} />
          <input
            type="hidden"
            name="redirectTo"
            value={`/snippets/${snippet.language}`}
          />

          <button
            type="submit"
            name="_action"
            value="delete"
            className="btn warning"
          >
            Delete snippet
          </button>
        </Form>
        <Link to={`./edit`} className="btn">
          Edit snippet
        </Link>
      </footer>
    </section>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.log("error: ", error)
  return (
    <section className="error-msg">
      <div className="center">
        <h1>Oh no, something is wrong with the snippet</h1>
        <p>Try pick the snippet again or choose another one</p>
        <EmptyState className="error-empty" />
      </div>
    </section>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <section className="error-msg">
      <div className="center">
        <h1>{caught.statusText}</h1>
        <EmptyState className="error-empty" />
      </div>
    </section>
  )
}
