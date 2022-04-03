// import connect from "~/database/mongoConnection"
// import { LoaderFunction } from "remix"

import { LoaderFunction, redirect } from "remix"

// import { SnippetType } from "../snippets"

// export const action: ActionFunction = async ({ request }) => {
//   const db = await connect()
//   const formData = await request.formData()
//   const actionType = formData.get("_action")
//   const snippetId = formData.get("id")
//   const isFavorited = formData.get("favorite")

//   switch (actionType) {
//     case "favorite":
//       const updatedSnippet = await db.models.Snippets.findByIdAndUpdate(
//         snippetId,
//         { favorite: isFavorited === "true" ? false : true }
//       )

//       try {
//         await updatedSnippet.save()
//       } catch (error) {
//         return redirect(`?erorr=${error}`)
//       }
//       return null
//     case "delete":
//       await db.models.Snippets.findByIdAndRemove(snippetId)
//       const redirectTo = formData.get("redirectTo") || "/snippets"
//       return redirect(redirectTo as string)

//     default:
//       return null
//   }
// }

export const loader: LoaderFunction = async ({ params }) => {
  return redirect("snippets/all")
  //   const db = await connect()
  //   const query = await db.models.Snippets.findOne({ _id: params.snippet })
  //   // Catch error and sent to CatchBoundary
  //   if (query.length === 0 && !query) {
  //     throw new Response("Not Found", {
  //       status: 404,
  //       statusText: "No snippetsadsadsadsadsadsds",
  //     })
  //   }
  //   return query
}
