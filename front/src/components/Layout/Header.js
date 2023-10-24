import { Link } from "react-router-dom"


export function Header () {
  return(
    <header>
      <div>
        <Link to="/" className="link"><h1>TODO APP</h1></Link>
      </div>
    </header>
  )
}