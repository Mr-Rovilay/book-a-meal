import { team } from "../data";

const Team = () => {
  return (
    <section className="team">
      <div className="flex flex-col items-center justify-center p-5 ">
        <div className="heading_section text-center mb-3 ">
          <h1 className="text-4xl text-dark-green font-extralight">OUR TEAM</h1>
          <p className="text-xl mb-5 text-dark-grey">
            Welcome to the heart and soul of our culinary journey. Our team is
            driven by passion, creativity, and a shared love for exceptional
            food experiences. Each member brings a unique set of skills and
            expertise, united by a common goal: to delight your taste buds and
            create memorable moments with every dish we serve. From our
            dedicated chefs crafting mouthwatering recipes to our attentive
            servers ensuring top-notch service, we're committed to exceeding
            your expectations at every turn. Join us as we embark on a
            gastronomic adventure filled with flavors, innovation, and a whole
            lot of heart.
          </p>
        </div>
        <div className="team_container flex flex-wrap w-full">
          {team.map((team) => {
            return (
              <div
                className="card flex items-center flex-col mb-3 p-5 w-[25%]"
                key={team.id}
              >
                <img className="mb-4 w-44" src={team.image} alt={team.name} />
                <h3 className="text-2xl">{team.name}</h3>
                <p className="text-dark-grey text-2xl">{team.designation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
