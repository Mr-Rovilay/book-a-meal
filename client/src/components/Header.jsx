import { Link } from "react-router-dom"


const Header = () => {
  return (
    <header>
      <div className="">
        <Link to={"/"}>
        <h4>Book<span>a</span>Meal</h4></Link>
        <div className="">
          <Navbar/>
        </div>
      </div>
    </header>
  )
}

export default Header