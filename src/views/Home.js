import React, { useEffect } from "react";
import "../App.css";

// TODO: Create animations
// import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);
import FarmCard from "./components/FarmCard";

const Home = (props) => {
  // TODO: Create animations
  // useEffect(() => {
  //   let speed = 100;

  //   let scene1 = gsap.timeline();
  //   ScrollTrigger.create({
  //     animation: scene1,
  //     trigger: ".scrollElement",
  //     start: "top top",
  //     end: "45% 100%",
  //     scrub: 3,
  //   });
  // });

  let farms = props.farm.farmBalances;
  let wallet = props.wallet;

  console.log({ farms });

  if (!wallet) {
    wallet = "not connected";
  }
  return (
    <div>
      <div class="title-container">
        <div class="title-item">
          <h1 class="title">Sim Farm</h1>
        </div>
      </div>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "800px",
        }}
      >
        <div class="farm-flex-container">
          {farms.map((farm, i) => (
            <FarmCard
              wallet={wallet}
              key={i}
              farm={farm}
              parentFarm={props.farm}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
