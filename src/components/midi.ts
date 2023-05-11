export class MIDIAccess {
    devices: WebMidi.MIDIInput[];
    // onDeviceInput: (input: number, value: number) => any;
    // onDeviceInput: (message: WebMidi.MIDIMessageEvent) => any;
    public onDeviceInput: (input: number, value: number) => any;
    // constructor(args: {onDeviceInput: (message: WebMidi.MIDIMessageEvent) => any}) {
    constructor(args: {onDeviceInput: (input: number, value: number) => any}) {
        console.log('args: ', args)
        this.devices = []
        this.onDeviceInput = args.onDeviceInput
    }

    start() {
        console.log('this: ', this)
        console.log("onDeviceInput: ", this.onDeviceInput)
        return new Promise((resolve, reject) => {
            this._requestAccess().then(access => {
                this.initialize(access as WebMidi.MIDIAccess);
                resolve(access);
            }).catch(() => reject('Something went wrong.'));
        });
    }

    initialize(access:  WebMidi.MIDIAccess) {
        const devices = access.inputs.values()
        for (let device of devices) {
            console.log(device)
            // device.onmidimessage = onMidiMessage;
            this.initializeDevice(device)
        }
    }

    initializeDevice(device: WebMidi.MIDIInput) {
        // device.onmidimessage = this.onMidiMessage;
        device.onmidimessage = this.onMessage;
    }

    onMessage(message: WebMidi.MIDIMessageEvent) {
        let [_, input, value] = message.data;
        // this.onDeviceInput(message)
        // this.onDeviceInput(input, value)
        this.onDeviceInput(input, value)
        // onDeviceInput(message)
    }


 onMidiMessage(e: MIDIMessageEvent) {
    // console.log('event: ', v);
    let [_, input, value] = e.data;
    console.log({input, value})
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

// export const midi = new MIDIAccess( {onDeviceInput})

// export function onDeviceInput(input: number, value: number) {
//     console.log('onDeviceInput! ', input, value)
// }
// export function onDeviceInput(message: WebMidi.MIDIMessageEvent) {
//     console.log('onDeviceInput! ', message.data[1], message.data[2])
// }

// export const getMidiInputs = () => {
//     navigator.requestMIDIAccess().then(access => {
//         const devices = access.inputs.values()
//         for (let device of devices) {
//             console.log(device)

//             device.onmidimessage = onMidiMessage;
//         }
//     }).catch(console.error)
// }
