import { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { uploadImage } from "../../common/aws";

const UpdateMenu = ({ params }) => {
  let characterLimit = 100;
  const [length, setLength] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data } = useLoaderData();
  const { register, handleSubmit, reset, watch } = useForm();
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      if (data.image[0]) {
        const uploadedImageUrl = await uploadImage(data.image[0]);
        if (uploadedImageUrl) {
          data.imageUrl = uploadedImageUrl;
          toast.success("Image uploaded successfully!");
          reset();
        }
      } else {
        toast.error("Please select an image.");
      }

      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: data.imageUrl,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/menu/${id}`,
        menuItem
      );

      if (response.status === 200) {
        reset();
        toast.success("Item updated successfully");
        navigate("/dashboard/manage-items");
      } else {
        toast.error("Failed to update item. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to update menu item.");
    }
  };

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(imageFile[0]);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <Toaster />
      <h2 className="text-2xl font-semibold my-4">
        Update This <span className="text-green">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input-box pl-4"
              defaultValue={data.name}
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
                {...register("category", { required: true })}
                className="select select-bordered "
                defaultValue={data.category}
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
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
                defaultValue={data.price}
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              defaultValue={data.recipe}
              {...register("recipe", { required: true })}
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
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs bg-black text-white"
            />
          </div>

          <button className="btn bg-green hover:bg-dark-green text-white px-6">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
