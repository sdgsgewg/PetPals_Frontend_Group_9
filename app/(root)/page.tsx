import React from "react";
import Slider from "../components/Slider";
import NormalContent from "../components/ContentTemplate/NormalContent";

const Home = () => {
  return (
    <NormalContent>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-500 mb-2">Home</h1>
        <Slider />
      </div>
    </NormalContent>
  );
};

export default Home;
