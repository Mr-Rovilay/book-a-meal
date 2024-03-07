import ContDown from "react-countdown";

const endingDate = new Date("2024-03-10");

const CountDown = () => {
  return (
    <ContDown className="font-bold text-5xl text-yellow" date={endingDate} />
  );
};

export default CountDown;
