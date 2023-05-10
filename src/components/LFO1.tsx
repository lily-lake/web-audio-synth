import { MouseEvent, ChangeEvent, useContext } from 'react';
import { CTX, OscSetting } from '../Store'

const Osc1 = () => {
    const { appState, updateState } = useContext(CTX);
    const { type, detune, frequency } = appState?.lfo1Settings;

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        let { id, value } = e.target;
        updateState({ type: 'CHANGE_LFO1', payload: { id: id as OscSetting, value: parseInt(value) } })
    }

    const changeType = (e: MouseEvent<HTMLButtonElement>) => {
        let { id } = e.target as HTMLElement;
        updateState({ type: 'CHANGE_LFO1_TYPE', payload: { id } })
    }
    return (
        <div className="control">
            <h2>LFO 1</h2>
            <div className="param">
                <h3>Frequency</h3>
                <input type="range" max="30" value={frequency} id="frequency" onChange={change} />
            </div>
            <div className="param">
                <h3>Detune</h3>
                <input type="range" id="detune" onChange={change} value={detune} />
            </div>
            <div className="param">
                <h3>Wave</h3>
                <button id="sine" onClick={changeType} className={`${type === "sine" && "active"}`}>Sine</button>
                <button id="triangle" onClick={changeType} className={`${type === "triangle" && "active"}`}>triangle</button>
                <button id="square" onClick={changeType} className={`${type === "square" && "active"}`}>square</button>
                <button id="sawtooth" onClick={changeType} className={`${type === "sawtooth" && "active"}`}>sawtooth</button>
            </div>
        </div>
    )
}

export default Osc1