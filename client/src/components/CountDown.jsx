import ContDown from "react-countdown";

const endingDate = new Date("2024-03-14");

const CountDown = () => {
  return (
    <ContDown
      className="font-bold text-5xl text-dark-green"
      date={endingDate}
    />
  );
};

export default CountDown;
