import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapContext from "./store/map-context";
import { Scene, Mapbox } from "@antv/l7";
import Header from "./components/Header";
import Focus from "./components/Focus";
import HomeView from "./views/HomeView";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App(): JSX.Element {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  useEffect(() => {
    // Initial Mapbox Token
    const token: string = import.meta.env.VITE_TOKEN;
    mapboxgl.accessToken = token;

    // Initial Mapbox map object & Antv L7 Scene Object
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [108, 35],
      zoom: 1,
      projection: "mercator",
    });
    const scene = new Scene({
      id: "map",
      map: new Mapbox({
        mapInstance: map,
      }),
      logoVisible: false,
    });

    // Updating China Boundary
    map.on("style.load", () => {
      map.setFog({});
      // 中华疆土，一寸不让
      map.setFilter("admin-0-boundary-disputed", [
        "all",
        ["==", ["get", "disputed"], "true"],
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "CN"], true, false],
      ]);
      map.setFilter("admin-0-boundary", [
        "all",
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "disputed"], "false"],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "CN"], true, false],
      ]);
      map.setFilter("admin-0-boundary-bg", [
        "all",
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "CN"], true, false],
      ]);
    });

    // Setting map and scene state
    setMap(map);
    setScene(scene);
  }, []);

  return (
    <MapContext.Provider value={{ map, scene }}>
      <Header />
      {/* <Focus /> */}
      <HomeView />
      <div id="map"></div>
    </MapContext.Provider>
  );
}

export default App;
