import React, { useContext } from "react";
import MapContext from "../../store/map-context";
import "./index.css";

const BottomControl: React.FC = () => {
  const { map } = useContext(MapContext);

  // Map Recover Button
  const viewRecover = () => {
    if (map) {
      map.flyTo({
        center: [114.3, 30.5],
        zoom: 1,
        pitch: 0,
      });
    } else {
      return;
    }
  };

  // FLY TO SHANGHAI
  const fylToSh = () => {
    if (map) {
      map.flyTo({
        center: [121.42, 31.3],
        zoom: 9,
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <div className="btn-groups">
        <div className="item" onClick={viewRecover}>
          <button className="btn-toggle">
            <i className="iconfont icon-supervision-full"></i>
          </button>
          <p>{"地图复位"}</p>
        </div>
        <div className="item" onClick={fylToSh}>
          <button className="btn-toggle">
            <i className="iconfont icon-icon-test"></i>
          </button>
          <p>{"飞入上海"}</p>
        </div>
      </div>
    </div>
  );
};

export default BottomControl;
