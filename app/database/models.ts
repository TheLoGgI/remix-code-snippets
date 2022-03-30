import { Schema } from "mongoose"

export type Snippet = {
  title: string
  language: string
  snippet: string
  description: string
  favorite: boolean
  createdAt: Date
  updatedAt: Date
}

const snippet = new Schema<Snippet>({
  title: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
})

// export const SnippetModel: Model<Snippet> = new Model("Snippet", snippet)
export const models = [
  {
    name: "Snippets",
    schema: snippet,
    collection: "snippets",
  },
]
