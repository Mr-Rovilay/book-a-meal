import Button from "./Button";

const Search = ({ text }) => {
  return (
    <>
      <div className="bg-slate-700 px-10 py-5 w-full">
        <form>
          <div className="max-w-2xl">
            <div className="flex space-x-1 items-center mb-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-dark-grey text-lg font-semibold">{text}</p>
            </div>
            <div className="flex space-x-4">
              <div className="flex rounded-md overflow-hidden w-full">
                <input
                  type="text"
                  className="w-full rounded-md rounded-r-none border-2 border-black pl-2"
                />
                <button className=" text-white px-6 text-lg font-semibold py-4 rounded-r-md border-2 border-black bg-green hover:bg-dark-green">
                  Search
                </button>
              </div>
              <Button text={"clear"} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
