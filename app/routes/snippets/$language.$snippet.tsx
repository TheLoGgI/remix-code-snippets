import ClipboardIcon from "~/components/clipboardIcon"
import StarIcon from "~/components/starIcon"
import connect from "~/database/mongoConnection"
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix"

import { SnippetType } from "../snippets"

// type requestWithURL = request & { parsedURL: URL }

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

  return query
}

export default function Snippet() {
  const snippet = useLoaderData<SnippetType>()
  let isJavascriptEnabled = false
  if (isJavascriptEnabled === false) {
    isJavascriptEnabled = true
  }

  return (
    <section className="snippet-section">
      <header>
        <div>
          <h2>{snippet.title}</h2>
          <p>{snippet.description}</p>
          <noscript>Your browser does not support JavaScript!</noscript>
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
      <div className="code-snippet">
        <div
          className="clipboard-banner"
          title="Copy to Clipboard"
          onClick={() => {
            console.log("snippet.snippet: ", snippet.snippet)
            navigator.clipboard.writeText(snippet.snippet)
          }}
        >
          <ClipboardIcon />
        </div>

        <code>
          <pre>{snippet.snippet}</pre>
        </code>
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
