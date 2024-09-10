import { GoChecklist } from "react-icons/go";
import { PiCookingPot } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { GrFormCheckmark } from "react-icons/gr";

const Steps = () => {
  return (
  <section className="py-16 max-padd-container x:py-28">
    <div className="max-w-[622px] pb-20 mx-auto text-center">
      <h3 className="uppercase h3">How it works ?</h3>
      <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quae vel magni? Ipsum architecto rerum recusandae placeat, ad, quidem amet, deserunt culpa reiciendis repellat distinctio molestiae. Eos deleniti voluptas asperiores.</p>
    </div>
    <div className="flex-wrap gap-5 flexCenter">
      <div className="gap-4 flexCenter">
        <div className="w-10 h-10 text-white rounded-full flexCenter bg-secondary"><GoChecklist className="text-2xl"/></div>
        <hr className="bg-[#555] outline-none border-none h-[1px] w-6 sm:w-44 rounded-full" />
      </div>
      <div className="gap-4 flexCenter">
        <div className="w-10 h-10 text-white rounded-full flexCenter bg-secondary"><PiCookingPot className="text-2xl"/></div>
        <hr className="bg-[#555] outline-none border-none h-[1px] w-6 sm:w-44 rounded-full" />
      </div>
      <div className="gap-4 flexCenter">
        <div className="w-10 h-10 text-white rounded-full flexCenter bg-secondary"><TbTruckDelivery className="text-2xl"/></div>
        <hr className="bg-slate-900/10 outline-none border-none h-[1px] w-6 sm:w-44 rounded-full" />
 
      </div>
      <div className="gap-4 flexCenter">
        <div className="w-10 h-10 text-white rounded-full flexCenter bg-secondary"><GrFormCheckmark className="text-2xl"/></div>
      </div>
    </div>
  </section>
  )
}

export default Steps