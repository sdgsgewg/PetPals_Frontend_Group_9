import React from "react";
import { Home, Heart, MapPin, Users } from "lucide-react";
import NavItem from "./NavItem";

const NavLink = () => {
  return (
    <>
      <NavItem href="/" icon={<Home size={16} />} label="Home" />
      <NavItem href="/adoptions" icon={<Heart size={16} />} label="Adoptions" />
      <NavItem href="/services" icon={<MapPin size={16} />} label="Services" />
      <NavItem href="/forums" icon={<Users size={16} />} label="Forums" />
    </>
  );
};

export default NavLink;
