import PropTypes from "prop-types";

const Search = ({ text }) => {
  return (
    <div className="flex justify-center">
      {" "}
      <form>
        <div className="max-w-3xl">
          {" "}
          <div className="flex rounded-md overflow-hidden w-full pb-5">
            <input
              type="text"
              placeholder={text}
              className="input-box w-full "
            />{" "}
            <button className=" text-white px-6 text-lg font-semibold py-4 rounded-r-md border-2 border-none bg-green hover:bg-dark-green">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Search;
