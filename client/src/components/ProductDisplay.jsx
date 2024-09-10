
import { useContext } from "react";
import Item from "./Item"
import { ShopContext } from "../context/ShopContext";

const ProductDisplay = ({category}) => {
  const {all_products} = useContext(ShopContext)
  return (
    <section id="food" className="py-16 max-padd-container xl:py-28">
       <div className="max-w-[622px] pb-20 mx-auto text-center">
          <h3 className="uppercase h3">Your chosen Flavors</h3>
          <p className="">
            Discover a selection of mouth-watering dishes, curated to satisfy every craving. Whether you&aspos;re in the mood for something familiar or eager to explore new flavors, our menu has something for everyone. Dive into a world of culinary delights, crafted with the freshest ingredients and delivered with care, straight to your doorstep.
          </p>
       </div>
       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {all_products.map((product) => {
             if (category === "All" || product.category === category) {
               return (
                 <div className="" key={product.id}> {/* Correct placement of key */}
                   <Item product={product}/>
                 </div>
               );
             }
          })}
       </div>
    </section>
  );
}

export default ProductDisplay;
