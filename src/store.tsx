import React, { ReactNode, useReducer, Dispatch } from "react";
import Osc from "./components/Osc";

export let actx = new AudioContext()
export let out = actx.destination
export let gain = actx.createGain();
export let distortion = actx.createWaveShaper();
export let filter = actx.createBiquadFilter();
export let compressor = actx.createDynamicsCompressor();
gain.connect(distortion)
distortion.connect(filter)
filter.connect(compressor);
compressor.connect(out)


export type OscSetting = "frequency" | "detune"
type FilterSetting = "frequency" | "detune" | "Q" | "gain"
type CompressorSetting = "attack" | "knee" | "ratio" | "release" | "threshold"

export type REDUCER_ACTION_TYPE =
    { type: 'START_OSC', payload: string } |
    { type: 'STOP_OSC', payload: string } |
    { type: 'START_CONTEXT', payload: string } |
    { type: 'STOP_CONTEXT', payload: string } |
    { type: 'CHANGE_OSC1', payload: { id: OscSetting, value: number } } |
    { type: 'CHANGE_OSC1_TYPE', payload: { id: string } } |
    { type: 'CHANGE_FILTER', payload: { id: string, value: number } } |
    { type: 'CHANGE_FILTER_TYPE', payload: { id: string } } |
    { type: 'MAKE_OSC', payload: { note: string, frequency: number } } |
    { type: 'KILL_OSC', payload: { note: string, frequency: number } } |
    { type: 'CHANGE_ADSR', payload: { id: string, value: number } } |
    { type: 'CHANGE_GAIN', payload: { value: number } } |
    { type: 'CHANGE_DISTORTION', payload: { value: number } } |
    { type: 'CHANGE_COMPRESSOR', payload: { id: string, value: number } } |
    { type: 'CHANGE_DISTORTION_OVERSAMPLE', payload: { value: OverSampleType } } |
    { type: 'CHANGE_DISTORTION_CURVE', payload: { value: Float32Array } } |
    { type: 'default', payload: '' }

type FilterSettings = {
    frequency: number;
    detune: number;
    Q: number;
    gain: number;
    type: BiquadFilterType;
}
type Osc1Settings = {
    detune: number;
    type: OscillatorType;
}

type EnvelopeSettings = {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
}

type CompressorSettings = {
    attack: number;
    knee: number;
    ratio: number;
    // reduction: number;
    release: number;
    threshold: number;
}


type ReducerState = {
    osc1Settings: Osc1Settings;
    filterSettings: FilterSettings;
    envelope: EnvelopeSettings;
    gain: number;
    compressor: CompressorSettings;
}

const initialState: ReducerState = {
    osc1Settings: {
        // frequency: osc1.frequency.value || 0,
        detune: 0,
        type: 'sine'
    },
    filterSettings: {
        frequency: filter.frequency.value || 0,
        detune: filter.detune.value || 0,
        Q: filter.Q.value || 0,
        gain: filter.gain.value || 0,
        type: filter.type || 'lowpass',
    },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.6,
        release: 0.1
    },
    gain: 1,
    compressor: {
        attack: 0,
        knee: 40,
        ratio: 12,
        // reduction: 0,
        release: 0.25,
        threshold: -50
    }
}

interface ContextType {
    appState: ReducerState;
    updateState: Dispatch<REDUCER_ACTION_TYPE>;
}

export const CTX = React.createContext<ContextType>({
    appState: initialState,
    updateState: () => { },
});

let nodes: Osc[] = [];

export const reducer = (state: ReducerState, action: REDUCER_ACTION_TYPE): ReducerState => {
    switch (action.type) {
        case 'MAKE_OSC':
            const newOsc = new Osc(actx, state.osc1Settings.type, action.payload.frequency, state.osc1Settings.detune, state.envelope, gain);
            nodes.push(newOsc);
            return { ...state };
        case 'KILL_OSC':
            let newNodes: Osc[] = [];
            nodes.forEach(node => {
                if (Math.round(node.osc.frequency.value) === Math.round(action.payload.frequency)) {
                    node.stop();
                } else {
                    newNodes.push(node);
                }
            });
            nodes = newNodes;
            return { ...state };
        case 'CHANGE_OSC1':
            return { ...state, osc1Settings: { ...state.osc1Settings, [action.payload.id]: action.payload.value } }
        case 'CHANGE_OSC1_TYPE':
            return { ...state, osc1Settings: { ...state.osc1Settings, type: action.payload.id as OscillatorType } }
        case 'CHANGE_FILTER':
            filter[action.payload.id as FilterSetting].value = action.payload.value;
            return { ...state, filterSettings: { ...state.filterSettings, [action.payload.id]: action.payload.value } }
        case 'CHANGE_FILTER_TYPE':
            filter.type = action.payload.id as BiquadFilterType;
            return { ...state, filterSettings: { ...state.filterSettings, type: action.payload.id as BiquadFilterType } }
        case 'CHANGE_ADSR':
            return { ...state, envelope: { ...state.envelope, [action.payload.id]: action.payload.value } }
        case 'CHANGE_GAIN':
            gain.gain.value = action.payload.value;
            return { ...state, gain: action.payload.value }
        case 'CHANGE_COMPRESSOR':
            // compressor[action.payload.id as FilterSetting].value = action.payload.value;
            compressor[action.payload.id as CompressorSetting].setValueAtTime(action.payload.value, actx.currentTime);
            return { ...state, compressor: { ...state.compressor, [action.payload.id]: action.payload.value } }
        default:
            console.log('reducer error. action: ', action);
            return { ...state };
    }
}

export default function Store(props: { children: ReactNode }) {
    const [appState, updateState] = useReducer(reducer, initialState);
    return <CTX.Provider value={{ appState, updateState }} > {props.children}</CTX.Provider >
}

// export default function Store(props: { children: ReactNode }) {
//     const [appState, updateState] = useReducer(reducer, {
//         osc1Settings: {
//             // frequency: osc1.frequency.value,
//             detune: 0,
//             type: 'sine'
//         },
//         filterSettings: {
//             frequency: filter.frequency.value,
//             detune: filter.detune.value,
//             Q: filter.Q.value,
//             gain: filter.gain.value,
//             type: filter.type,
//         },
//         envelope: {
//             attack: 0.005,
//             decay: 0.1,
//             sustain: 0.6,
//             release: 0.1
//         },
//         gain: 1,
//         distortion: {
//             curve: new Float32Array(44100),
//             oversample: 'none'
//         },
//         compressor: {
//             attack: 0,
//             knee: 40,
//             ratio: 12,
//             // reduction: 0,
//             release: 0.25,
//             threshold: -50
//         }
//     });
//     // return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>

//     return <CTX.Provider value={{ appState, updateState }} > {props.children}</CTX.Provider >
// }