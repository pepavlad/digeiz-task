import React, { useState } from "react";
import { Graph } from "./components/graph";
import { Select } from "./components/select";
import { getSelectOptions } from "./utilities/get-select-options.utility";
import trajectories from "./mocks/trajectoires.json";
import { getFilteredPlanePointsById } from "./utilities/get-plane-points.utility";
import { getAverageSpeed } from "./utilities/get-average-speed.utility";
import { getNumberOfStops } from "./utilities/get-number-of-stops.utility";
import "./app.styles.css";

const App: React.FC = () => {
  const options = getSelectOptions(trajectories);
  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const points = getFilteredPlanePointsById(selectedValue, trajectories);

  const averageSpeed = getAverageSpeed(points);
  const stopsNumber = getNumberOfStops(points);

  return (
    <div className="container">
      <Select options={options} value={selectedValue} onChange={handleSelect} />
      <Graph data={points} width={1200} height={600} padding={1} />
      <div className="metrics">
        <span>Average speed: {averageSpeed}</span>
        <span>Number of stops: {stopsNumber}</span>
      </div>
    </div>
  );
};

export default App;
