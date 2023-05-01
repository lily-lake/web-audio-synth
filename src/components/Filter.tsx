import { ChangeEvent } from 'react'

interface FilterProps {
    change: (e: ChangeEvent<HTMLInputElement>) => void;
    settings: FilterSettings;
    changeType: (e: any) => void;
}

interface FilterSettings {
    frequency: number;
    detune: number;
    Q: number;
    gain: number;
    type: BiquadFilterType;
}

const Filter = (props: FilterProps) => {
    const { change, settings, changeType } = props;
    const { frequency, detune, Q, gain, type } = settings;
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
                <button onClick={changeType} id="lowshelf" className={`${type === "lowshelf" && "active"}`}>lowpass</button>
                <button onClick={changeType} id="highshelf" className={`${type === "highshelf" && "active"}`}>highshelf</button>
            </div>
        </div>
    )
}

export default Filter