import { useContext } from 'react'
import { CTX } from '../Store'
import LogarithmicRange from './logarithmic-inputs/LogarithmicRange';

const ADSR = () => {
    const { appState, updateState } = useContext(CTX);
    let { attack, decay, sustain, release } = appState.envelope;

    const logChange = (id: string, value: number) => {
        // console.log('slider values: ', values)
        console.log("id, value: ", id, value)
        // let { id, value } = e.target;
        // updateState({ type: 'CHANGE_ADSR', payload: { id, value: parseInt(value) } })
        updateState({ type: 'CHANGE_ADSR', payload: { id, value: value - 1 } })
    }
    // const logChange = (values: LogValues) => {
    //     console.log('slider values: ', values)
    //     // let { id, value } = e.target;
    //     // updateState({ type: 'CHANGE_ADSR', payload: { id, value: parseInt(value) } })
    //     updateState({ type: 'CHANGE_ADSR', payload: { id: "attack", value: values.value - 1 } })
    // }
    return (
        <div className="control"><h2>ADSR</h2>
            <div className="param">
                <h3>attack</h3>
                {/* <input type="range" id="attack" onChange={change} max="2" step="0.02" value={attack} /> */}
                <LogarithmicRange onChange={logChange} maxval={5} minval={0} defaultValue={attack} id="attack" />
                <p>{attack.toFixed(2)}</p>
            </div>
            <div className="param">
                <h3>decay</h3>
                {/* <input type="range" id="decay" onChange={change} max="1" step="0.01" value={decay} /> */}
                <LogarithmicRange onChange={logChange} maxval={5} minval={0} defaultValue={decay} id="decay" />
                <p>{decay.toFixed(2)}</p>
            </div>
            <div className="param">
                <h3>sustain</h3>
                {/* <input type="range" id="sustain" onChange={change} max="1" step="0.01" value={sustain} /> */}
                <LogarithmicRange onChange={logChange} maxval={2} minval={0} defaultValue={sustain} id="sustain" />
                <p>{sustain.toFixed(2)}</p>
            </div>
            <div className="param">
                <h3>release</h3>
                {/* <input type="range" id="release" onChange={change} max="2" step="0.02" value={release} /> */}
                <LogarithmicRange onChange={logChange} maxval={5} minval={0} defaultValue={release} id="release" />
                <p>{release.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ADSR