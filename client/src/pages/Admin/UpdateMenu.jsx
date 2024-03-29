import { useState } from "react";
import { FaUtensils } from "react-icons/fa";

const UpdateMenu = () => {
  let characterLimit = 100;
  const [length, setLength] = useState(0);
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update This <span className="text-green">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              className="input-box pl-4 "
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                className="select select-bordered bg-white text-black"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                className="input-box pl-4"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              className="h-40 resize-none leading-7 input-box"
              placeholder="Tell the worlds about your recipe"
              onChange={(e) => setLength(e.target.value.length)}
              maxLength={characterLimit}
            ></textarea>
            <p className="mt-1 text-dark-grey text-sm text-right">
              {characterLimit - length} characters left
            </p>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              type="file"
              className="file-input w-full max-w-xs bg-black text-white"
            />
          </div>

          <button className="btn bg-green text-white px-6">
            Update Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
