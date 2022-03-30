import connect from "~/database/mongoConnection"
import styles from "~/styles/new.css"
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix"

import { SnippetType } from "../snippets"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const doc = {
    title: form.get("title"),
    language: form.get("language"),
    description: form.get("description"),
    snippet: form.get("snippet"),
    updatedAt: new Date(),
  }

  const db = await connect()
  const updatedSnippet = await db.models.Snippets.findByIdAndUpdate(
    form.get("id"),
    doc
  )

  try {
    await updatedSnippet.save()
    return redirect(
      `/snippets/${updatedSnippet.language}/${updatedSnippet._id}`
    )
  } catch (error) {
    return redirect(`/snippet/}`)
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const db = await connect()

  return await db.models.Snippets.findOne({ _id: params.snippet })
}

export default function Edit() {
  const snippet = useLoaderData<SnippetType>()

  return (
    <section className="snippet-edit">
      <Form method="post" className="new-form">
        <input type="hidden" name="id" value={snippet._id} />
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={snippet.title}
            className="border p-1 border-gray-200 w-full"
          />
        </div>
        <div className="input-field">
          <label htmlFor="language">Language</label>
          <select name="language" id="language" defaultValue={snippet.language}>
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="ruby">Ruby</option>
            <option value="haskel">Haskel</option>
            <option value="coffescript">CoffeScript</option>
            <option value="haskell">Haskell</option>
            <option value="kotlin">Kotlin</option>
            <option value="dart">Dart</option>
            <option value="php">PHP</option>
            <option value="htmlcss">HTML/CSS</option>
            <option value="lua">Lua</option>
            <option value="go">Go</option>
            <option value="shell">Shell</option>
            <option value="sql">SQL</option>
            <option value="perl">Perl</option>
            <option value="swift">Swift</option>
            <option value="c#">C#</option>
            <option value="c++">C++</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            defaultValue={snippet.description}
            id="description"
            className="border p-1 border-gray-200 w-full"
          />
        </div>
        <div className="input-field">
          <label htmlFor="snippet">Snippet</label>
          <textarea
            name="snippet"
            id="snippet"
            rows={20}
            cols={30}
            defaultValue={snippet.snippet}
          ></textarea>
        </div>

        <input className="btn" type="submit" value="Update snippet" />
      </Form>
    </section>
  )
}
