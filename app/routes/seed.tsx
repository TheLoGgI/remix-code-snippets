import fs from "fs"

import connect from "~/database/mongoConnection"
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix"

// TypeError: Converting circular structure to JSON
import seedJsonData from "../database/seed.json"
import styles from "../styles/seed.css"

// Error: ENOENT: no such file or directory, open '../database/seed.json'
// const seedData = fs.readFileSync("../database/seed.json", "utf8")

// TypeError: Converting circular structure to JSON

type SeedLoaderType = Record<"seedCount" | "snippetCount", number>

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const action: ActionFunction = async () => {
  const db = await connect()
  db.models.Snippets.deleteMany({})
  db.models.Snippets.insertMany(seedJsonData)
  return redirect("/snippets")
}

export const loader: LoaderFunction = async () => {
  const db = await connect()

  return {
    snippetCount: db.models.Snippets.countDocuments(),
    seedCount: seedJsonData.length,
  }
}

export default function Seed() {
  const { snippetCount, seedCount } = useLoaderData<SeedLoaderType>()

  return (
    <section className="seed">
      <div className="seed-view">
        <p>
          <b> You have {snippetCount} snippets in the database</b>
        </p>
        <p>Do you want to seed the database with {seedCount} snippets</p>
        <div className="seed-actions">
          <Form>
            <button className="btn" type="submit">
              Seed
            </button>
          </Form>
          <Link to="/snippets" className="btn outline">
            No
          </Link>
        </div>
      </div>
    </section>
  )
}
