import ProfileImg from "../assets/profile.avif"

const Header = () => {
  return (
    <header className="py-2 bg-white max-padd-container flexBetween">
  <h4 className="text-xl">
            Book<span className="text-secondary">a</span>Meal
          </h4>
<img src={ProfileImg} alt="" srcset="" className="w-7 h-7" />
    </header>
  )
}

export default Header