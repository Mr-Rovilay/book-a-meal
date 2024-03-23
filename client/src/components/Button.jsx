const Button = ({ text, icon, type }) => {
  return (
    <button
      type={type}
      className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
