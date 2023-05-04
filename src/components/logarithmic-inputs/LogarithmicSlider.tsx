import { useState } from 'react'
import Slider from 'rc-slider'
import Log from './Log';
import 'rc-slider/assets/index.css';

export interface SliderChangeValues {
    lowPosition: number;
    highPosition: number;
    lowValue: number;
    highValue: number;
}
interface SliderInputs {
    defaultHighPosition?: number;
    defaultLowPosition?: number;
    minpos?: number;
    maxpos?: number;
    minval?: number;
    maxval?: number;
    onChange: (values: SliderChangeValues) => void;
}

const LogarithmicSlider = ({ onChange, defaultHighPosition = 50, defaultLowPosition = 0, minpos = 0, maxpos = 100, minval = 5, maxval = 1600 }: SliderInputs) => {
    const [highPosition, setHighPosition] = useState(defaultHighPosition);
    const [lowPosition, setLowPosition] = useState(defaultLowPosition);

    const log = new Log({
        minpos,
        maxpos,
        minval,
        maxval
    })

    const calculateValue = (position: number) => {
        if (position === 0) return 0
        const value = log.value(position)
        if (value > 1000) return Math.round(value / 100) * 100
        if (value > 500) return Math.round(value / 10) * 10
        return Math.round(value)
    }

    const handleChange = (value: number | number[]): void => {
        const newLowPosition = Array.isArray(value) ? value[0] : value;
        const newHighPosition = Array.isArray(value) ? value[1] : value;
        setLowPosition(newLowPosition)
        setHighPosition(newHighPosition)
        if (!onChange) {
            return console.error('Pass an onChange function to <LogarithmicRange />')
        }

        const newValues = {
            lowPosition: newLowPosition,
            highPosition: newHighPosition,
            lowValue: calculateValue(newLowPosition),
            highValue: calculateValue(newHighPosition)
        }
        onChange(newValues)
    }
    return (
        <Slider range value={[lowPosition, highPosition]} onChange={handleChange} allowCross={true} />
    )
}

export default LogarithmicSlider