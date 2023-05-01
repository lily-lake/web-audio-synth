interface Osc1Props {
    changeFreq: (e: any) => void;
    freq: number;
    changeDetune: (e: any) => void;
    detune: number;
}

const Osc1 = (props: Osc1Props) => {
    const { changeFreq, freq, changeDetune, detune } = props;
    return (
        <div className="control">
            <h2>Osc 1</h2>
            <div className="param">
                <h3>Frequency</h3>
                <input type="range" max="5000" value={freq} id="frequency" onChange={changeFreq} />
            </div>
            <div className="param">
                <h3>Detune</h3>
                <input type="range" id="detune" onChange={changeDetune} value={detune} />
            </div>
        </div>
    )
}

export default Osc1