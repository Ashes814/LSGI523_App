import React, { useState } from "react";
import SmartCity from "../SmartCity";
import G2Chart from "../G2Chart";
import BottomControl from "../BottomControl";
import School from "../School";
import LeftPanel from "../../components/LeftPanel";
import "./index.css";
const HomeView: React.FC = () => {
  const [isShowPanel, setIsShowPanel] = useState(false);

  return (
    <div>
      {/* <SmartCity /> */}

      <button
        className="show-btn"
        onClick={() => {
          setIsShowPanel(!isShowPanel);
        }}
      >
        {!isShowPanel ? "Layer Panel" : "Close"}
      </button>
      {isShowPanel ? <LeftPanel /> : ""}
      {/* <School /> */}
      {/* {isShowG2 ? <G2Chart /> : ""} */}
      {/* <BottomControl showControlHandler={showControlHandler} /> */}
    </div>
  );
};

export default HomeView;
