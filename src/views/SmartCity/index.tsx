import { useContext, useEffect, useState } from "react";
import MapContext from "../../store/map-context";
import axios from "axios";
import { message } from "antd";
import {
  CityBuildingLayer,
  LayerSwitch,
  LineLayer,
  PolygonLayer,
  PointLayer,
  HeatmapLayer,
  LayerPopup,
} from "@antv/l7";

import hkRoadData from "../../../src/assets/data/hkRoad.json";
import hkEVData from "../../../src/assets/data/geotagging.json";
import hkSenData from "../../../src/assets/data/sensitive.json";

import shRailData from "../../../src/assets/data/shRail.json";
import shSubwayData from "../../../src/assets/data/shSubway.json";

import { DrawTool } from "../../components/DrawTool";

// Data

export default function SmartCity({ curLayers }) {
  const ctx = useContext(MapContext);
  const { map, scene } = ctx;

  if (map && scene) {
    if (curLayers === "Road") {
      scene.removeAllLayer();
    }
    if (curLayers === "EV") {
      scene.removeAllLayer();
      scene.addImage("marker", "src/assets/icons/evCharger.svg");
      const hkEVLayer = new PointLayer({
        name: "hkEV",
        visible: true,
      })
        .source(hkEVData)
        .shape("marker")
        .color("")
        .animate(false)
        .active({
          color: "#f5606a",
        })
        .size(15);
      scene?.addLayer(hkEVLayer);
      // ADD DOT LAYER POP
      const hkEVLayerPop = new LayerPopup({
        items: [
          {
            layer: hkEVLayer,
            fields: [
              {
                field: "REMARK_FOR__OTHERS_",
                formatField: () => "Type",
                formatValue: (remark?: string) => remark?.trim() ?? "No Data",
              },
              {
                field: "LOCATION_EN",
                formatField: () => "Location",
                formatValue: (name?: string) => name?.trim() ?? "No Data",
              },
            ],
          },
        ],
        trigger: "hover",
      });
      scene.addPopup(hkEVLayerPop);
    }

    if (curLayers === "hkSens") {
      scene.removeAllLayer();
      const hkSensLayer = new PolygonLayer({
        name: "Sensitive Street in Hong Kong",
        visible: true,
      });
      hkSensLayer
        .source(hkSenData)
        .shape("fill")
        .color("#rgba(245, 96, 106, 0.7)")
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .style({ opacity: 0.6 });
      scene?.addLayer(hkSensLayer);
    }

    if (curLayers === "shRail") {
      scene.removeAllLayer();
      const shRailLayer = new LineLayer({
        name: "sh Rail",
        visible: true,
      });
      shRailLayer
        .source(shRailData)
        .size(0.5)
        .shape("line")
        .animate({
          interval: 1,
          duration: 2,
          trailLength: 2,
        })
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .color("fclass", [
          "#2E8AE6",
          "#69D1AB",
          "#DAF291",
          "#FFD591",
          "#FF7A45",
          "#CF1D49",
        ]);
      scene.addLayer(shRailLayer);
    }
    if (curLayers === "shSubway") {
      console.log("shRoad");
      scene.removeAllLayer();
      const shSubwayLayer = new HeatmapLayer({
        name: "上海地铁站客流量",
      })
        .source(shSubwayData)
        .size("capacity", [0, 1])
        .shape("heatmap")
        // weight映射通道
        .style({
          intensity: 5,
          radius: 10,
          rampColors: {
            colors: [
              "#2E8AE6",
              "#69D1AB",
              "#DAF291",
              "#FFD591",
              "#FF7A45",
              "#CF1D49",
            ],
            positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
          },
        });
      scene.addLayer(shSubwayLayer);
    }
  }

  return <></>;
}
