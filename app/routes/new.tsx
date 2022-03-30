import connect from "~/database/mongoConnection"
import React from "react"
import { ActionFunction, Form, redirect } from "remix"

import styles from "../styles/new.css"

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
    creadedAt: new Date(),
    updatedAt: new Date(),
  }

  const db = await connect()
  const newSnippet = new db.models.Snippets(doc)

  try {
    await newSnippet.save()
    return redirect(`/snippets/${newSnippet.language}/${newSnippet._id}`)
  } catch (error) {
    return redirect(`/snippet/}`)
  }
}

export default function New() {
  return (
    <section className="snippet-add">
      <Form method="post" className="new-form">
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            required
            id="title"
            className="border p-1 border-gray-200 w-full"
          />
        </div>
        <div className="input-field">
          <label htmlFor="language">Language</label>
          <select name="language" id="language" required>
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
            <option value="cs">C#</option>
            <option value="c++">C++</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            required
            name="description"
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
            required
          ></textarea>
        </div>

        <input className="btn" type="submit" value="Add new snippet" />
      </Form>
    </section>
  )
}
