import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: 'auto'
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function YearSlider({year, setYear}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setYear(newValue);
  };


  return (
    <div className={classes.root}>
      <Typography gutterBottom>
        Carbon Emission Year
      </Typography>
      <Slider
        defaultValue={year}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={handleChange}
        step={1}
        marks
        min={1990}
        max={2018}
      />
   </div>
  )
}
