import { ChangeEvent, useContext } from 'react'
import { CTX } from '../Store';

const Compressor = () => {
    const { appState, updateState } = useContext(CTX);
    const { attack, ratio, release, knee, threshold } = appState.compressor;
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        let { id, value } = e.target;
        console.log("id, value: ", id, value)
        updateState({ type: 'CHANGE_COMPRESSOR', payload: { id, value: parseFloat(value) } })
    }
    return (
        <div className="control"><h2>Compressor</h2>
            <div className="param">
                <h3>attack</h3>
                <input type="range" id="attack" onChange={change} min="0" max="1" step="0.02" value={attack} />

            </div>
            <div className="param">
                <h3>ratio</h3>
                <input type="range" id="ratio" onChange={change} max="20" min="1" step="0.1" value={ratio} />
            </div>
            <div className="param">
                <h3>knee</h3>
                <input type="range" id="knee" onChange={change} min="0" max="40" step="0.01" value={knee} />
            </div>
            <div className="param">
                <h3>release</h3>
                <input type="range" id="release" onChange={change} max="1" step="0.02" value={release} />
            </div>
            <div className="param">
                <h3>threshold</h3>
                <input type="range" id="threshold" onChange={change} min="-100" max="0" step="0.5" value={threshold} />
            </div>
        </div>)
}

export default Compressor