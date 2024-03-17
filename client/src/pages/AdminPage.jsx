import Button from "../components/Button";
import { singleProduct } from "../data";

const ProductTable = ({ product }) => {
  return (
    <table className="w-full text-left border-spacing-6">
      <thead>
        <tr className="">
          <th className="font-bold text-2xl py-12">Image</th>
          <th className="font-bold text-2xl">Id</th>
          <th className="font-bold text-2xl">Title</th>
          <th className="font-bold text-2xl">Price</th>
          <th className="font-bold text-2xl">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-12">
            <img
              src={product.img}
              width={50}
              height={50}
              className="object-cover"
              alt=""
            />
          </td>
          <td>{product.id}</td>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td className="flex gap-2 py-12">
            <Button text={"Edit"} />
            <button className="bg-red text-white rounded-lg py-3 px-3 text-xl capitalize hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out">
              Delete
            </button>
          </td>
        </tr>

        <tr className="mt-18">
          <td className="py-12">
            <img
              src={product.img}
              width={50}
              height={50}
              className="object-cover"
              alt=""
            />
          </td>
          <td>{product.id}</td>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td className="flex gap-2 py-12">
            <Button text={"Edit"} />
            <button className="bg-red text-white rounded-lg py-3 px-3 text-xl capitalize hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const OrderTable = ({ order }) => {
  return (
    <table className="w-full text-left custom-table-spacing">
      <thead className="py-12">
        <tr className="py-12">
          <th className="font-bold text-2xl py-12">Id</th>
          <th className="font-bold text-2xl">Customer</th>
          <th className="font-bold text-2xl">Total</th>
          <th className="font-bold text-2xl">Payment</th>
          <th className="font-bold text-2xl">Status</th>
          <th className="font-bold text-2xl">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-12">{order.id}</td>
          <td className="text-2xl">{order.customer}</td>
          <td>{order.total}</td>
          <td>{order.payment}</td>
          <td>{order.status}</td>
          <td>
            <Button text={"Next Stage"} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const AdminPage = () => {
  return (
    <section className="min-h-screen bg-gray-100">
      <div className="pt-36 container p-12 flex">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">Products</h1>
          <ProductTable product={singleProduct} />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold">Orders</h1>
          <OrderTable
            order={{
              id: "1234567643456a452354".slice(0, 5),
              customer: "name",
              total: "$1000",
              payment: "paid",
              status: "preparing",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
