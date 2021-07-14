import React, { useState } from "react";
import MapChart from './MapChart';
import YearSlider from './YearSlider';

const App = () => {
  const [selectedYear, setSelectedYear] = useState(2017);
  return (
    <>
      <YearSlider setYear={setSelectedYear} year={selectedYear}/>
      <MapChart year={selectedYear}/>
    </>
  )
};

export default App;
