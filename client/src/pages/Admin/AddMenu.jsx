import { useContext, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { uploadImage } from "../../common/aws";
import { UserContext } from "../../router/Router";
import axios from "axios";

const AddMenu = () => {
  const {
    userAuth,
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);
  let characterLimit = 100;
  const [length, setLength] = useState(0);
  const { register, handleSubmit, reset, watch } = useForm();
  const [previewUrl, setPreviewUrl] = useState(null);

  const onSubmit = async (data) => {
    try {
      if (data.image[0]) {
        // Call the upload function
        const uploadedImageUrl = await uploadImage(data.image[0]);
        if (uploadedImageUrl) {
          console.log("Image URL:", uploadedImageUrl);
          // Add the image URL to the form data or do something with it
          data.imageUrl = uploadedImageUrl;
          toast.success("Menu item added successfully!");
          reset(); // Reset form fields
        }
      } else {
        toast.error("Please select an image.");
      }
      // Define menuItem object
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        // Access imageUrl property safely
        image: data.imageUrl, // Use the uploaded image URL from data object
      };

      // Assuming you've properly defined ImageUrl elsewhere in your code
      // Ensure ImageUrl is defined before accessing its data

      // Send POST request to the backend API
      const postMenuItem = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/menu",
        menuItem
      );
      console.log(postMenuItem);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to add menu item.");
    }
  };

  // To preview the image before uploading
  const imageFile = watch("image");

  // Update the preview URL whenever the file input changes
  useState(() => {
    if (imageFile && imageFile.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(imageFile[0]);
    } else {
      setPreviewUrl(null); // Clear preview
    }
  }, [imageFile]);

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <Toaster />
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
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
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
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
          {/* Image preview section (optional) */}
          {previewUrl && (
            <div className="preview">
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}

          <button className="btn bg-green text-white px-6">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
