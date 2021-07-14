import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import  ReactTooltip  from 'react-tooltip'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const MapChart = ({year}) => {
  const [data, setData] = useState([]);
  const colorScale = scaleLinear()
  .domain([0.0, 500])
  .range(["#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618"]);

  useEffect(() => {
    csv(`/owid-co2-data.csv`).then((data) => {
      setData(data);
    });
  }, []);
  const [toolTip, setTooltip] = useState(false)
  const [name, setTooltipName] = useState("");
  const [population, setPopulation] = useState("");
  const [co2, setCo2] = useState("")

  return (
    <div>
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
      data-tip=""
    >
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.filter((s) =>s.iso_code === geo.properties.ISO_A3 && s.year == year );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME} = geo.properties;
                    setTooltip(true)
                    setTooltipName(`${NAME}`);
                    setPopulation(`${d[0]?.population}`);
                    setCo2(`${d[0]?.co2}`)
                  }}
                  onMouseLeave={() => {
                    setTooltip(false)
                    setTooltipName("");
                    setPopulation("");
                    setCo2("");
                  }}
                 fill={d ? colorScale(d[0]?.co2) : "#EEE"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
    {toolTip ? 
      <ReactTooltip>
        <div>
          <p>Name - {name}</p> 
          <p>Population - {population}</p>
          <p>Co2 Emission - {co2}</p>
        </div>
      </ReactTooltip> : 
      null
    }
</div>
  );
};

export default MapChart;
