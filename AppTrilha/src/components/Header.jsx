import React from "react";
import BackButton from "./BackButton";

const Header = ({ title, path }) => {
  return (
    <header
      className={` bg-[#2D8C50] w-full h-16 text-white font-bold fixed top-0 left-0 z-500`}
    >
      <div className="max-w-screen-lg mx-auto flex items-center p-4 text-left text-2xl px-6">
        <BackButton path={path}  />
        <h1 className="ml-4">{title}</h1>
      </div>
    </header>
  );
};

export default Header;