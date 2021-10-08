import React, { useEffect } from "react";
import "../App.css";

// // typical import
// import gsap from "gsap";

// // or get other plugins:
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Draggable from "gsap/Draggable";

// or all tools are exported from the "all" file (excluding bonus plugins):
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
import FarmCard from "./components/FarmCard";

// don't forget to register plugins
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

const Home = () => {
  useEffect(() => {
    let speed = 100;

    /*  SCENE 1 */
    let scene1 = gsap.timeline();
    ScrollTrigger.create({
      animation: scene1,
      trigger: ".scrollElement",
      start: "top top",
      end: "45% 100%",
      scrub: 3,
    });
  });

  let farms = [0, 1];
  return (
    <div>
      <div class="title-container">
        <div class="title-item">
          <h1 class="title">Sim Farm</h1>
        </div>
      </div>

      {/* <div style={{ width: "700px" }}> */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          // background: "green",
          width: "800px",
          // height: "900px",
        }}
      >
        <div class="farm-flex-container">
          {farms.map((object, i) => (
            <FarmCard obj={object} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
