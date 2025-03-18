import React from "react";
import { Home, Heart, MapPin, Users } from "lucide-react";
import NavItem from "./NavItem";

interface NavLinkProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLink: React.FC<NavLinkProps> = ({ setIsOpen }) => {
  return (
    <>
      <NavItem
        href="/"
        icon={<Home size={16} />}
        label="Home"
        setIsOpen={setIsOpen}
      />
      <NavItem
        href="/adoptions"
        icon={<Heart size={16} />}
        label="Adoptions"
        setIsOpen={setIsOpen}
      />
      <NavItem
        href="/services"
        icon={<MapPin size={16} />}
        label="Services"
        setIsOpen={setIsOpen}
      />
      <NavItem
        href="/forums"
        icon={<Users size={16} />}
        label="Forums"
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default NavLink;
