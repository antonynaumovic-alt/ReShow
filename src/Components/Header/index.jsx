import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/auth">Authentication</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/classes">Classes</Link>
        </li>
        <li>
          <Link to="/homework">Homework</Link>
        </li>
      </ul>
    </nav>
  )
}