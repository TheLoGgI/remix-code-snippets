import { SnippetType } from "~/routes/snippets"
import { Link } from "remix"

import StarIcon from "./starIcon"

const SnippetCard: React.FC<
  { snippet: SnippetType } & { to?: string; selected?: boolean }
> = ({ snippet, to, selected = false }) => {
  console.log("selected: ", selected)
  return (
    <div
      className={selected ? "snippet-selected snippet-card" : "snippet-card"}
    >
      <Link to={to ? to : `${snippet.language}/${snippet._id}`}>
        <div className="snippet-card-content">
          <div className="snippet-list-item">
            <p className="description">{snippet.description}</p>
            <p className="short-snippet">{snippet.snippet}</p>
          </div>
          <StarIcon isFavorited={snippet.favorite} />
        </div>
      </Link>
    </div>
  )
}

export default SnippetCard
