import React from "react";
import Navbar from "../components/navbar";
import Game from "../game/game";
//import SceneComponent from "../game/SceneComponent.js";
const gameTest = () => {
  return (
    <>
      <Navbar />
      <div className="Heading"></div>
      <div>
        <Game className="Ipsum" />
      </div>
    </>
  );
};

export default gameTest;
