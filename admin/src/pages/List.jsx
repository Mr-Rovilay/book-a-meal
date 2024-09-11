import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiTrash } from "react-icons/fi";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      console.log(response.data);
      setList(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch the product list");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [url]);

  const removeProduct = async (productId) => {  
    try {
     const response = await axios.post(`${url}/api/product/remove`, {
        id:productId,
      })
      await fetchList();
      if(response.data.success){
        toast.success("Product removed successfully!");
      }
   // Remove from local state
    } catch (error) {
      toast.error("Failed to remove the product");
      console.error("Error:", error);
    }
  }

  return (
    <div className='box-border w-full p-4 bg-white sm:p-10'>
      <h4 className="mb-4 text-2xl font-semibold uppercase">Product List</h4>
      {list.length > 0 ? (
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className='py-12 border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start'>
              <th className='p-2 text-left border-b'>Image</th>
              <th className='p-2 text-left border-b'>Title</th>
              <th className='p-2 text-left border-b'>Price</th>
              <th className='p-2 text-left border-b'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {list.map((product) => (
              <tr key={product._id} className="text-left border-b hover:bg-gray-100 border-slate-900/20 medium-14">
                <td className="p-1 border-b">
                  <img
                    src={`${url}/images/${product.image}`}
                    alt={product.name}
                    height={38}
                    width={38}
                    className="object-cover m-1 rounded-lg ring-1 ring-slate-900/5"
                  />
                </td>
                <td className="p-1 border-b ">{product.name}</td>
                <td className="p-1 border-b">${product.price}</td>
                <td className="p-1 border-b">
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remove ${product.name}`}
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default List;
