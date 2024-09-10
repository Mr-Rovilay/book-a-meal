import{ categories} from "../assets/data"

const Categories = ({category, setCategory}) => {
  return (
    <section id="menu" className="py-16 max-padd-container">
       <div className="max-w-[622px] pb-20 mx-auto text-center">
      <h3 className="uppercase h3">Flavors to Explore</h3>
      <p className="text-gray-600">
  Discover a world of flavors, from hearty meals to light bites, carefully crafted to satisfy every palate. Whether you&apos;re craving something savory, sweet, or a little bit of both, our diverse menu has it all. Explore our categories and find the perfect dish that suits your taste, with each option promising fresh, delicious, and unforgettable flavors. Click through the categories to explore new culinary experiences and place your order effortlessly.
</p>

    </div>
    <div className="flex-wrap gap-10 md:flexStart">
      {categories.map((item)=>(
        <div className={`${category === item.name ? "ring-1 ring-slate-900/5": "" } flexCenter flex-col mt-2 bg-white rounded-2xl cursor-pointer`} key={item} onClick={() =>setCategory((prev)=>(prev === item.name? "All" : item.name))} id={item.name}>
          <div className="p-8 rounded-2xl">
          <img src={item.image} alt="category img" srcSet="" height={122} width={122} className="object-contain aspect-square" />
          </div>
          <h4 className="pb-4 medium-14">{item.name}</h4>
       
        </div>
      ))}
    </div>
    </section>
  )
}

export default Categories