import { all_products } from "../assets/data"
import Item from "./Item"


const ProductDisplay = ({category}) => {
  return (
    <section id="food" className="py-16 max-padd-container xl:py-28">
       <div className="max-w-[622px] pb-20 mx-auto text-center">
      <h3 className="uppercase h3">Your chosen Flavors</h3>
      <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quae vel magni? Ipsum architecto rerum recusandae placeat, ad, quidem amet, deserunt culpa reiciendis repellat distinctio molestiae. Eos deleniti voluptas asperiores.</p>
    </div>
    <div className="">
      {all_products.map((product)=>{
         if(category === "All" || product.category === category) return (
          <div className="" key={product.id}>
            <Item/>
          </div>
         )
        
      })}
    </div>
    </section>
  )
}

export default ProductDisplay