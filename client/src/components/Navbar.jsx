import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Navbar = ({ containerStyles, header, menuOpen }) => {
  const [isActive, setIsActive] = useState("home");
  return (
    <nav className={containerStyles}>
      {["home", "menu", "food", "contact"].map((link) => (
        <a
          href={`#${link}`}
          key={link}
          onClick={() => setIsActive(link)}
          className={
            header || menuOpen
              ? isActive === link
                ? "text-secondary"
                : "text-tertiary"
              : isActive === link
              ? "text-tertiary"
              : "text-secondary"
          }
        >
          <div className="">{link.charAt(0).toUpperCase() + link.slice(1)}</div>
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
