import { ChangeEvent, MouseEvent, useContext } from 'react'
import { CTX, OscSetting } from '../Store';

const Filter = () => {
    const { appState, updateState } = useContext(CTX);
    const { frequency, detune, Q, gain, type } = appState.filterSettings;

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        let { id, value } = e.target;
        updateState({ type: 'CHANGE_FILTER', payload: { id: id as OscSetting, value: parseInt(value) } })
    };

    const changeType = (e: MouseEvent<HTMLButtonElement>) => {
        let { id } = e.target as HTMLElement;
        updateState({ type: 'CHANGE_FILTER_TYPE', payload: { id } })
    }
    return (
        <div className="control">
            <h2>Filter</h2>
            <div className="param">
                <h3>Frequency</h3>
                <input value={frequency} type="range" onChange={change} id="frequency" max="10000" />
            </div>
            <div className="param">
                <h3>Detune</h3>
                <input value={detune} type="range" onChange={change} id="detune" />
            </div>
            <div className="param">
                <h3>Gain</h3>
                <input value={gain} type="range" onChange={change} id="gain" max="10" />
            </div>
            <div className="param">
                <h3>Q</h3>
                <input value={Q} type="range" onChange={change} id="Q" max="10" />
            </div>

            <div className="param">
                <h3>Type</h3>
                <button onClick={changeType} id="lowpass" className={`${type === "lowpass" && "active"}`}>lowpass</button>
                <button onClick={changeType} id="highpass" className={`${type === "highpass" && "active"}`}>highpass</button>
                <button onClick={changeType} id="notch" className={`${type === "notch" && "active"}`}>notch</button>
                <button onClick={changeType} id="lowshelf" className={`${type === "lowshelf" && "active"}`}>lowshelf</button>
                <button onClick={changeType} id="highshelf" className={`${type === "highshelf" && "active"}`}>highshelf</button>
            </div>
        </div>
    )
}

export default Filter