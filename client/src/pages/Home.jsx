import Hero from "../components/Hero"
import Steps from "../components/Steps"
import Categories from "../components/Categories"
import { useState } from "react"
import ProductDisplay from "../components/ProductDisplay"
import FindUs from "../components/FindUs"

const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <>
      <Hero/>
  <Steps/>
  <Categories category={category} setCategory={setCategory}/>
  <ProductDisplay category={category} />
  <FindUs/>
    </>
  )
}

export default Home