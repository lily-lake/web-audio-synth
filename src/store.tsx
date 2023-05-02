import React, { ReactNode } from "react";

// let audioContext: AudioContext;
// let out;
// let osc1: OscillatorNode;
// let gain1;
// let filter: BiquadFilterNode;

// window.onload = function () {

//     audioContext = new AudioContext()
//     out = audioContext.destination
//     osc1 = audioContext.createOscillator();
//     gain1 = audioContext.createGain();
//     filter = audioContext.createBiquadFilter();
//     osc1.connect(gain1)
//     gain1.connect(filter)
//     filter.connect(out);
// }

// osc1.start();

let audioContext = new AudioContext()
let out = audioContext.destination
let osc1 = audioContext.createOscillator();
let gain1 = audioContext.createGain();
let filter = audioContext.createBiquadFilter();
osc1.connect(gain1)
gain1.connect(filter)
filter.connect(out);

const CTX = React.createContext();
export { CTX, osc1 }

export type OscSetting = "frequency" | "detune"
type FilterSetting = "frequency" | "detune" | "Q" | "gain"


export function reducer(state, action) {
    let { id, value } = action.payload || {};
    console.log('reducer')
    switch (action.type) {
        // case "START_OSC":
        //     console.log('start osc')
        //     // gain1 = audioContext.createGain();
        //     // filter = audioContext.createBiquadFilter();
        //     // osc1.connect(gain1)
        //     // gain1.connect(filter)
        //     // filter.connect(out);
        //     osc1.start();
        //     return { ...state };
        // case "STOP_OSC":
        //     osc1.stop();
        //     return { ...state };
        case "START_CONTEXT":
            audioContext = new AudioContext();
            out = audioContext.destination
            osc1 = audioContext.createOscillator();
            gain1 = audioContext.createGain();
            filter = audioContext.createBiquadFilter();
            osc1.connect(gain1)
            gain1.connect(filter)
            filter.connect(out);
            return { ...state };
        case "STOP_CONTEXT":
            // osc1.stop();
            return { ...state };
        case "CHANGE_OSC1":
            osc1[id as OscSetting].value = value;
            return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } }
        case "CHANGE_OSC1_TYPE":
            osc1.type = id;
            return { ...state, osc1Settings: { ...state.osc1Settings, type: id } }
        case "CHANGE_FILTER":
            filter[id as FilterSetting].value = value;
            return { ...state, filterSettings: { ...state.filterSettings, [id]: value } }
        case 'default':
            console.log('reducer error. action: ', action);
            return { ...state }
    }
}

export default function Store(props: { children: ReactNode }) {
    const stateHook = React.useReducer(reducer, {
        osc1Settings: {
            frequency: osc1.frequency.value,
            detune: osc1.detune.value,
            type: osc1.type
        },
        filterSettings: {
            frequency: filter.frequency.value,
            detune: filter.detune.value,
            Q: filter.Q.value,
            gain: filter.gain.value,
            type: filter.type,
        }
    });
    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
}