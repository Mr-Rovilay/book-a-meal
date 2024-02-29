const Button = () => {
  return (
    <>
      <div className="flex items-center group">
        <button className="btn-green">Choose Your Meal Plan</button>
        <i className="fi fi-rr-arrow-small-right btn-green inline-block group-hover:!translate-x-2 duration-200 bg-green"></i>
      </div>
    </>
  );
};

export default Button;
