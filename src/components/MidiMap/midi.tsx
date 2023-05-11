import { useContext, createContext, PropsWithChildren } from 'react'

export class MIDIAccess {
    devices: WebMidi.MIDIInput[];
    // onDeviceInput: (message: WebMidi.MIDIMessageEvent) => any;
    onDeviceInput: (input: number, value: number) => any;
    constructor(onDeviceInput?: (input: number, value: number) => void) {
        this.devices = []
        this.onDeviceInput = onDeviceInput || console.log
    }

    start() {
        return new Promise((resolve, reject) => {
            this._requestAccess().then(access => {
                this.initialize(access as WebMidi.MIDIAccess);
                resolve(access);
            }).catch(() => reject('Something went wrong.'));
        });
    }

    initialize(access: WebMidi.MIDIAccess) {
        const devices = access.inputs.values()
        for (let device of devices) {
            this.initializeDevice(device)
            this.devices.push(device)
        }
        console.log('this: ', this)
    }

    initializeDevice(device: WebMidi.MIDIInput) {
        device.onmidimessage = this.onMessage.bind(this);
    }

    onMessage(message: WebMidi.MIDIMessageEvent) {
        let [_, input, value] = message.data;
        this.onDeviceInput(input, value)
    }

    _requestAccess() {
        return new Promise((resolve, reject) => {
            if (navigator.requestMIDIAccess) {
                navigator.requestMIDIAccess().then(resolve).catch(reject);
            } else {
                reject();
            }
        })
    }
}



const midi = new MIDIAccess()
midi.start();
const MidiContext = createContext(midi);

export const useMidiContext = () => useContext(MidiContext)

export const MidiContextProvider = (props: PropsWithChildren) => {
    return <MidiContext.Provider value={midi}>{props.children}</MidiContext.Provider>
}