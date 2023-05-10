import { ChangeEvent, useContext } from 'react'
import { CTX } from '../../Store';

const Gain = () => {
    const { appState, updateState } = useContext(CTX);
    const { gain } = appState;
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        console.log("gain: ", value)
        updateState({ type: 'CHANGE_GAIN', payload: { value: parseFloat(value) } })
    }
    return (
        <div className="control">
            <div className="param">
                <h3>Volume</h3>
                <input value={gain} type="range" onChange={change} min={0} max={1} step={0.01} />
            </div>

        </div>
    )
}

export default Gain