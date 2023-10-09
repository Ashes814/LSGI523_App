import React, { useState, useContext } from "react";

import MapContext from "../../store/map-context";
import "./index.css";
import { LineLayer } from "@antv/l7";
import SmartCity from "../../views/SmartCity";
import { DrawTool } from "../DrawTool";
import { MeasureTool } from "../MeasureTool";
import { Modal } from "antd";

const LeftPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showText, setShowText] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const { map } = useContext(MapContext);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const drawTools = {};
  // flyToFunctions
  const flyToRoadNetwork = () => {
    if (map) {
      map.flyTo({
        center: [114.18, 22.4],
        zoom: 13,
      });
    } else {
      return;
    }
  };
  const flyToEvCharger = () => {
    if (map) {
      map.flyTo({
        center: [114.1881, 22.3189],
        zoom: 10,
      });
    } else {
      return;
    }
  };
  const flyToHKSens = () => {
    if (map) {
      map.flyTo({
        center: [114.13, 22.23],
        zoom: 14,
      });
    } else {
      return;
    }
  };
  const flyToShRailway = () => {
    if (map) {
      map.flyTo({
        center: [121.42, 31.3],
        zoom: 9,
      });
    } else {
      return;
    }
  };
  const flyToShSubway = () => {
    if (map) {
      map.flyTo({
        center: [121.43, 31.2],
        zoom: 10,
      });
    } else {
      return;
    }
  };
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {contents}
      </Modal>
      <SmartCity curLayers={showText} />
      <div className="drawTools">
        <MeasureTool drawTools={drawTools} />
      </div>

      <div className="panel">
        <h2>HK</h2>
        <h2>Smart Mobility</h2>
        <button
          className="btn-panel"
          onClick={() => {
            setShowText("Road");
            flyToRoadNetwork();
          }}
        >
          Road Network
        </button>
        <button
          className="btn-panel"
          onClick={() => {
            setShowText("EV");
            showModal();
            setTitle("Electric Vehicle Charger Station in Hong Kong");
            setContents(
              <div className="text">
                The Bureau said that in the first quarter of this year, electric
                vehicles accounted for nearly half of new private cars sold, and
                the total number of electric private cars has exceeded 30,000,
                accounting for 4.6% of the total number of private cars
                <img
                  style={{ width: "100%" }}
                  src="src/assets/images/evPic1.jpeg"
                ></img>
              </div>
            );
            flyToEvCharger();
          }}
        >
          Ev Charge Station
        </button>
        <button
          className="btn-panel"
          onClick={() => {
            setShowText("hkSens");
            flyToHKSens();
          }}
        >
          Sensitive Street
        </button>
        <button className="btn-panel">Strategic Street</button>
        <h2>Smart Environment</h2>
        <button className="btn-panel">Smart Sanitary</button>
        <button className="btn-panel">Energy Control</button>
        <button className="btn-panel">Pollution Reducing</button>
        <button className="btn-panel">Smart Air Quality</button>
      </div>

      <div className="panel2">
        <h2>SH</h2>
        <h2>Smart Mobility</h2>
        <button
          className="btn-panel"
          onClick={() => {
            setShowText("shRail");
            showModal();
            setTitle("Railways in Shanghai");
            setContents(
              <div className="text">
                The Shanghai Municipal Railway is an urban rail transit system
                that serves the fast, medium and long-distance connections
                between the main urban area of ​​Shanghai and new cities as well
                as nearby Shanghai towns and new cities. It is composed of three
                layers: municipal lines, urban lines, and local lines. rail
                transit network. According to Shanghais urban master plan,
                Shanghai will build{" "}
                <span style={{ color: "rgba(245, 96, 106, 0.7)" }}>
                  <strong>500 kilometers</strong>
                </span>{" "}
                of urban railways.
              </div>
            );
            flyToShRailway();
          }}
        >
          Railway Network
        </button>
        <button
          className="btn-panel"
          onClick={() => {
            setShowText("shSubway");
            showModal();
            setTitle("Passenage Flow of Metro Station in Shanghai");
            setContents(
              <div className="text">
                The average daily passenger flow of Shanghai Metro is more than
                10 million, and the passenger volume of the entire network in
                2019 was 3.88 billion; the highest single-day passenger flow in
                history was 13.294 million. The Shanghai Metro is the main mode
                of transportation for Shanghai residents in the city.
              </div>
            );
            flyToShSubway();
          }}
        >
          Metro st flow
        </button>
        <button className="btn-panel">Sensitive Street</button>
        <button className="btn-panel">Strategic Street</button>
        <h2>Smart Environment</h2>
        <button className="btn-panel">Smart Sanitary</button>
        <button className="btn-panel">Energy Control</button>
        <button className="btn-panel">Pollution Reducing</button>
        <button className="btn-panel">Smart Air Quality</button>
      </div>
    </>
  );
};

export default LeftPanel;
