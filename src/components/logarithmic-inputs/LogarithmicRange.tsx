import { useState, ChangeEvent } from 'react'
import Log from './Log'

export interface LogValues {
    position: number;
    value: number;
}

interface RangeProps {
    onChange: (newValues: LogValues) => void;
    defaultValue?: number;
    minpos?: number;
    maxpos?: number;
    minval?: number;
    maxval?: number;

}


const LogarithmicRange = ({ onChange, minpos = 0, maxpos = 100, minval = 5, maxval = 1600, defaultValue }: RangeProps) => {
    const log = new Log({
        minpos,
        maxpos,
        minval,
        maxval
    })
    const [position, setPosition] = useState<number | undefined>(defaultValue ? log.position(defaultValue) : undefined)



    const calculateValue = (position: number) => {
        if (position === 0) return 0
        const value = log.value(position)
        if (value > 1000) return Math.round(value / 100) * 100
        if (value > 500) return Math.round(value / 10) * 10
        return value
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPosition = parseInt(e.target.value);
        setPosition(newPosition);
        if (!onChange) {
            return console.error('Pass an onChange function to <LogarithmicRange />')
        }
        const newValues = {
            position: newPosition,
            value: calculateValue(newPosition)
        }
        onChange(newValues)
    }
    return (
        <input type="range" min={minpos} max={maxpos} value={position} onChange={handleChange} />
    )
}

export default LogarithmicRange