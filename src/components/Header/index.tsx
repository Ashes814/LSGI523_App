import { useContext } from "react";
import MapContext from "../../store/map-context";
import "./index.css";
const Header: React.FC = () => {
  const { map } = useContext(MapContext);
  const flyToSh = () => {
    if (map) {
      map.flyTo({
        center: [121.42, 31.3],
        zoom: 10,
        // pitch: 45,
      });
    } else {
      return;
    }
  };
  const flyToHk = () => {
    if (map) {
      map.flyTo({
        center: [114.17, 22.4],
        zoom: 10,
      });
    } else {
      return;
    }
  };
  return (
    <>
      <header className="header">
        <h1>Smart City Shanghai & Honkong </h1>
        <button className="btn-head" onClick={flyToSh}>
          SH
        </button>
        <button className="btn-head" onClick={flyToHk}>
          HK
        </button>
      </header>
    </>
  );
};
export default Header;
