import { SnippetType } from "~/types"
import { Link } from "remix"

import StarIcon from "./starIcon"

const SnippetCard: React.FC<
  { snippet: SnippetType } & { to?: string; selected?: boolean }
> = ({ snippet, to, selected = false }) => {
  return (
    <div
      className={selected ? "snippet-selected snippet-card" : "snippet-card"}
    >
      <Link to={to ?? `/snippets/${snippet.language}/${snippet._id}`}>
        <div className="snippet-card-content">
          <div className="snippet-list-item">
            <p className="description">{snippet.title}</p>
            <p className="short-snippet">{snippet.snippet}</p>
          </div>
          <StarIcon isFavorited={snippet.favorite} />
        </div>
      </Link>
    </div>
  )
}

export default SnippetCard
