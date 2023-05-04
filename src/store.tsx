import React, { ReactNode, useReducer, Dispatch } from "react";
import Osc from "./components/Osc";
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

let actx = new AudioContext()
let out = actx.destination
export let osc1 = actx.createOscillator();
let gain1 = actx.createGain();
let filter = actx.createBiquadFilter();
osc1.connect(gain1)
gain1.connect(filter)
filter.connect(out);


export type OscSetting = "frequency" | "detune"
type FilterSetting = "frequency" | "detune" | "Q" | "gain"

export const enum REDUCER_ACTION_TYPE {
    START_OSC,
    STOP_OSC,
    CHANGE_OSC1,
    CHANGE_OSC1_TYPE,
    CHANGE_FILTER,
    CHANGE_FILTER_TYPE,
    MAKE_OSC,
    KILL_OSC,
    default
}

type ReducerAction = {
    payload: {
        id?: string;
        value?: number | string;
        note?: any;
        freq?: number;
    };
    type: REDUCER_ACTION_TYPE;
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
type ReducerState = {
    osc1Settings: Osc1Settings;
    filterSettings: FilterSettings;
}

const initialState: ReducerState = {
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

interface ContextType {
    appState: ReducerState;
    updateState: Dispatch<ReducerAction>;
}

export const CTX = React.createContext<ContextType>({
    appState: initialState,
    updateState: () => { },
});

// export const CTX = React.createContext({initialState
// });



let nodes: Osc[] = [];

export const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
    let { id, value, freq } = action.payload || {};
    console.log('state: ', state)
    console.log('action: ', action)
    switch (action.type) {
        case REDUCER_ACTION_TYPE.MAKE_OSC:
            // console.log('make osc, note and freq: ', note, freq);
            const newOsc = new Osc(actx, "sawtooth", freq, 0, null, gain1);
            nodes.push(newOsc);
            return { ...state };
        case REDUCER_ACTION_TYPE.KILL_OSC:
            let newNodes: Osc[] = [];
            nodes.forEach(node => {
                if (Math.round(node.osc.frequency.value) === Math.round(freq)) {
                    node.stop();
                } else {
                    newNodes.push(node);
                }
            });
            nodes = newNodes;
            // console.log('kill osc, note and freq: ', note, freq);
            return { ...state };
        // case REDUCER_ACTION_TYPE.START_OSC:
        //     console.log('start osc')
        //     // gain1 = audioContext.createGain();
        //     // filter = audioContext.createBiquadFilter();
        //     // osc1.connect(gain1)
        //     // gain1.connect(filter)
        //     // filter.connect(out);
        //     osc1.start();
        //     return { ...state };
        // case REDUCER_ACTION_TYPE.STOP_OSC:
        //     osc1.stop();
        //     return { ...state };
        case REDUCER_ACTION_TYPE.START_OSC:
            actx = new AudioContext();
            out = actx.destination
            osc1 = actx.createOscillator();
            gain1 = actx.createGain();
            filter = actx.createBiquadFilter();
            osc1.connect(gain1)
            gain1.connect(filter)
            filter.connect(out);
            return { ...state };
        case REDUCER_ACTION_TYPE.STOP_OSC:
            // osc1.stop();
            return { ...state };
        // case REDUCER_ACTION_TYPE.START_CONTEXT:
        //     audioContext = new AudioContext();
        //     out = audioContext.destination
        //     osc1 = audioContext.createOscillator();
        //     gain1 = audioContext.createGain();
        //     filter = audioContext.createBiquadFilter();
        //     osc1.connect(gain1)
        //     gain1.connect(filter)
        //     filter.connect(out);
        //     return { ...state };
        // case REDUCER_ACTION_TYPE.STOP_CONTEXT:
        //     // osc1.stop();
        //     return { ...state };
        case REDUCER_ACTION_TYPE.CHANGE_OSC1:
            osc1[id as OscSetting].value = value;
            return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } }
        case REDUCER_ACTION_TYPE.CHANGE_OSC1_TYPE:
            osc1.type = id as OscillatorType;
            return { ...state, osc1Settings: { ...state.osc1Settings, type: id as OscillatorType } }
        case REDUCER_ACTION_TYPE.CHANGE_FILTER:
            filter[id as FilterSetting].value = value;
            // return { ...state }
            return { ...state, filterSettings: { ...state.filterSettings, [id]: value } }
        case REDUCER_ACTION_TYPE.CHANGE_FILTER_TYPE:
            filter.type = id as BiquadFilterType;
            return { ...state, filterSettings: { ...state.filterSettings, type: id as BiquadFilterType } }
        default:
            console.log('reducer error. action: ', action);
            return { ...state };
    }
}

export default function Store(props: { children: ReactNode }) {
    // const stateHook = useReducer(reducer, {
    const [appState, updateState] = useReducer(reducer, {
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

    return <CTX.Provider value={{ appState, updateState }} > {props.children}</CTX.Provider >
}