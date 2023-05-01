interface Osc1Props {
    change: (e: any) => void;
    settings: Osc1Settings
}

interface Osc1Settings {
    frequency: number;
    detune: number;
}

const Osc1 = (props: Osc1Props) => {
    const { change, settings } = props;
    return (
        <div className="control">
            <h2>Osc 1</h2>
            <div className="param">
                <h3>Frequency</h3>
                <input type="range" max="5000" value={settings.frequency} id="frequency" onChange={change} />
            </div>
            <div className="param">
                <h3>Detune</h3>
                <input type="range" id="detune" onChange={change} value={settings.detune} />
            </div>
        </div>
    )
}

export default Osc1