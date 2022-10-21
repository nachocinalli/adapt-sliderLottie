import React from 'react';
import { classes, compile } from 'core/js/reactHelpers';
export default function SliderControl({ _id, _isEnabled, _label, _currentFrame, _totalFrames, _lottie, _items, onChange, ...props }) {

  const handleChange = (event) => {
    onChange(parseInt(event.target.value));
  };

  return (
    <div className="sliderlottie__slider">
      <label htmlFor={`slider-input-${_id}`} className='slideritems__label'>{_label}</label>
      <input
        id={`slider-input-${_id}`}
        className={classes(['sliderlottie__slider-input',
          !_isEnabled && 'is-disabled'])}
        type='range'
        step='1'
        min='0'
        max={_totalFrames || _items.length - 1}
        value={_currentFrame || 0}
        aria-valuenow={_currentFrame || 0}
        aria-valuetext={compile(_items[_currentFrame]?.title || '')}
        disabled={!_isEnabled}
        onChange={handleChange}
        list={`sliderlottie-data-${_id}`}>
      </input>
      <datalist id={`sliderlottie-data-${_id}`}>
        {_items.map(({ title, value }, index) => (
          <option className={_currentFrame === value ? 'is-active' : ''} key={index} value={value}>
            {value}
          </option>
        ))}
      </datalist>
      <div className='sliderlottie__slider-container'>
        <span className='sliderlottie__slider-current'>{_currentFrame}</span>
        <span className='sliderlottie__slider-total'>{_totalFrames || _items.length - 1}</span>
      </div>
    </div>
  );
}
