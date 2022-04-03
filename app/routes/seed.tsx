import connect from "~/database/mongoConnection"
import seedJsonData from "~/database/seed.json"
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix"

type SeedLoaderType = Record<"seedCount" | "snippetCount", number>

export const action: ActionFunction = async () => {
  const db = await connect()
  try {
    await db.models.Snippets.deleteMany()
    await db.models.Snippets.insertMany(seedJsonData)
  } catch (error) {
    throw error
  }
  return redirect("/snippets")
}

export const loader: LoaderFunction = async () => {
  const db = await connect()

  return {
    snippetCount: await db.models.Snippets.countDocuments(),
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
          <Form method="post">
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
