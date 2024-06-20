/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const RangeSlider = ({updateTo, updateFrom, min = 0, max = 100, name=''}) => {
  const [fromValue, setFromValue] = useState(min);
  const [toValue, setToValue] = useState(max);

  useEffect(() => {
    fillSlider(fromValue, toValue, '#C6C6C6', '#25daa5');
    setToggleAccessible(toValue);
  }, [fromValue, toValue]);

  const fillSlider = (from, to, sliderColor, rangeColor) => {
    const rangeDistance = max - min; // max - min
    const fromPosition = from - min; // from - min
    const toPosition = to - min; // to - min
    document.getElementById(`toSlider-${name}`).style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} 100%)`;
  };

  const setToggleAccessible = (value) => {
    const toSlider = document.getElementById(`toSlider-${name}`);
    if (value <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  };

  const handleFromSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFromValue(value > toValue ? toValue : value);
    updateFrom(value > toValue ? toValue : value);
  };

  const handleToSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setToValue(value < fromValue ? fromValue : value);
    updateTo(value < fromValue ? fromValue : value);
  };

  const handleFromInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFromValue(value > toValue ? toValue : value);
    updateFrom(value > toValue ? toValue : value);
  };

  const handleToInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setToValue(value < fromValue ? fromValue : value);
    updateTo(value < fromValue ? fromValue : value);
  };

  return (
    <div className="range_container">
      <div className="sliders_control">
        <input
          id={`fromSlider-${name}`}
          style={{height: '0', zIndex: 1}}
          type="range"
          value={fromValue}
          min={min}
          max={max}
          onChange={handleFromSliderChange}
        />
        <input
          id={`toSlider-${name}`}
          type="range"
          value={toValue}
          min={min}
          max={max}
          onChange={handleToSliderChange}
        />
      </div>
      <div className="form_control">
        <div className="form_control_container">
          <div className="form_control_container__time white">Min</div>
          <input
            className="form_control_container__time__input"
            type="number"
            value={fromValue}
            min={min}
            max={max}
            onChange={handleFromInputChange}
          />
        </div>
        <div className="form_control_container">
          <div className="form_control_container__time white">Max</div>
          <input
            className="form_control_container__time__input"
            type="number"
            value={toValue}
            min={min}
            max={max}
            onChange={handleToInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
