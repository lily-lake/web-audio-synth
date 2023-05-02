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

const initialState: State = {
    osc1Settings: {
        frequency: osc1.frequency.value || 0,
        detune: osc1.detune.value || 0,
        type: osc1.type || 'sine'
    },
    filterSettings: {
        frequency: filter.frequency.value || 0,
        detune: filter.detune.value || 0,
        Q: filter.Q.value || 0,
        gain: filter.gain.value || 0,
        type: filter.type || 'lowpass',
    }
}

const CTX = React.createContext(initialState);
export { CTX, osc1 }

export type OscSetting = "frequency" | "detune"
type FilterSetting = "frequency" | "detune" | "Q" | "gain"
type ActionType = | 'START_OSC'
    | 'STOP_OSC'
    | 'CHANGE_OSC1'
    | 'CHANGE_OSC1_TYPE'
    | 'CHANGE_FILTER'
    | 'CHANGE_FILTER_TYPE'
    | 'MAKE_OSC'
    | 'KILL_OSC'
    | 'default'

type Action = {
    payload: {
        id: any;
        value: any;
        note: any;
        freq: any;
    };
    type: ActionType;
}
type FilterSettings = {
    frequency: number;
    detune: number;
    Q: number;
    gain: number;
    type: BiquadFilterType;
}
type Osc1Settings = {
    frequency: number;
    detune: number;
    type: OscillatorType;
}
type State = {
    osc1Settings: Osc1Settings;
    filterSettings: FilterSettings;
}

export function reducer(state: State, action: Action) {
    let { id, value, note, freq } = action.payload || {};
    console.log('reducer')
    console.log('state: ', state)
    console.log('action: ', action)
    switch (action.type) {
        case "MAKE_OSC":
            console.log('make osc, note and freq: ', note, freq);
            return { ...state };
        case "KILL_OSC":
            console.log('kill osc, note and freq: ', note, freq);
            return { ...state };
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
        case "START_OSC":
            audioContext = new AudioContext();
            out = audioContext.destination
            osc1 = audioContext.createOscillator();
            gain1 = audioContext.createGain();
            filter = audioContext.createBiquadFilter();
            osc1.connect(gain1)
            gain1.connect(filter)
            filter.connect(out);
            return { ...state };
        case "STOP_OSC":
            // osc1.stop();
            return { ...state };
        // case "START_CONTEXT":
        //     audioContext = new AudioContext();
        //     out = audioContext.destination
        //     osc1 = audioContext.createOscillator();
        //     gain1 = audioContext.createGain();
        //     filter = audioContext.createBiquadFilter();
        //     osc1.connect(gain1)
        //     gain1.connect(filter)
        //     filter.connect(out);
        //     return { ...state };
        // case "STOP_CONTEXT":
        //     // osc1.stop();
        //     return { ...state };
        case "CHANGE_OSC1":
            osc1[id as OscSetting].value = value;
            return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } }
        case "CHANGE_OSC1_TYPE":
            osc1.type = id;
            return { ...state, osc1Settings: { ...state.osc1Settings, type: id } }
        case "CHANGE_FILTER":
            filter[id as FilterSetting].value = value;
            // return { ...state }
            return { ...state, filterSettings: { ...state.filterSettings, [id]: value } }
        case "CHANGE_FILTER_TYPE":
            filter.type = id;
            return { ...state, filterSettings: { ...state.filterSettings, type: id } }
        default:
            console.log('reducer error. action: ', action);
            return { ...state };
    }
}

export default function Store(props: { children: ReactNode }) {
    // const stateHook = React.useReducer(reducer, {
    const [appState, updateState] = React.useReducer(reducer, {
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
    // return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>

    return <CTX.Provider value={[appState, updateState]}>{props.children}</CTX.Provider>
}