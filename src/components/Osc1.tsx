interface Osc1Props {
    // change: (e: any) => void;
    changeType: (e: any) => void;
    // settings: Osc1Settings
}

// interface Osc1Settings {
//     frequency: number;
//     detune: number;
//     type: OscillatorType;
// }

import { MouseEvent, ChangeEvent, useContext } from 'react';
import { CTX, osc1 } from '../Store'

const Osc1 = () => {
    const [appState, updateState] = useContext(CTX);
    // console.log("appState: ", appState)
    const { type, frequency, detune } = appState?.osc1Settings;

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        let { id, value } = e.target;
        updateState({ type: 'CHANGE_OSC1', payload: { id, value } })
    }

    const changeType = (e: MouseEvent<HTMLButtonElement>) => {
        let { id } = e.target as HTMLElement;
        updateState({ type: "CHANGE_OSC1_TYPE", payload: { id } })
    }
    return (
        <div className="control">
            <h2>Osc 1</h2>
            <button onClick={() => osc1.start()}>Start</button>
            <button onClick={() => osc1.stop()}>Stop</button>
            {/* <button onClick={() => updateState({ type: "START_OSC" })}>Start</button>
            <button onClick={() => updateState({ type: "STOP_OSC" })}>Stop</button> */}
            <div className="param">
                <h3>Frequency</h3>
                <input type="range" max="5000" value={frequency} id="frequency" onChange={change} />
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