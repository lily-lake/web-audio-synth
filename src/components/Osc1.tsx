interface Osc1Props {
    change: (e: any) => void;
    changeType: (e: any) => void;
    settings: Osc1Settings
}

interface Osc1Settings {
    frequency: number;
    detune: number;
    type: OscillatorType;
}

const Osc1 = (props: Osc1Props) => {
    const { change, settings, changeType } = props;
    const { type, frequency, detune } = settings;
    return (
        <div className="control">
            <h2>Osc 1</h2>
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