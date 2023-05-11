import { useContext } from 'react'
import { CTX } from '../../Store'
import LogarithmicRange from '../logarithmic-inputs/LogarithmicRange';
import { MIDIAccess } from '../MidiMap/midi';
import Log from '../logarithmic-inputs/Log';

interface MidiParam {
    id: string;
    minval: number;
    maxval: number;
}
const ADSR = () => {
    const { appState, updateState } = useContext(CTX);
    let { attack, decay, sustain, release } = appState.envelope;
    const midiMap: Record<number, MidiParam> = {
        49: { id: "attack", minval: 0.02, maxval: 5 },
        50: { id: "decay", minval: 0.02, maxval: 5 },
        51: { id: "sustain", minval: 0.02, maxval: 2 },
        52: { id: "release", minval: 0.02, maxval: 5 },
    }
    // const log = new Log({ minpos: 1, maxpos: 127, minval: 0.01, maxval: 5 })
    const onDeviceInput = (input: number, value: number) => {
        // console.log(input, value)
        const log = midiMap[input] ? new Log({ minpos: 1, maxpos: 127, minval: midiMap[input].minval, maxval: midiMap[input].maxval }) : new Log({ minpos: 1, maxpos: 127, minval: 0.02, maxval: 5 })
        const logValue = log.value(value);
        // console.log('logValue: ', logValue)
        logChange(midiMap[input]?.id || "attack", logValue + 1)
    }
    const midi = new MIDIAccess(onDeviceInput)
    midi.start()
    const logChange = (id: string, value: number) => {
        // console.log("id, value: ", id, value)
        updateState({ type: 'CHANGE_ADSR', payload: { id, value: value - 1 } })
    }

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