export const getMidiInputs = () => {
    navigator.requestMIDIAccess().then(access => {
        const devices = access.inputs.values()
        for (let device of devices) {
            console.log(device)

            device.onmidimessage = onMidiMessage;
        }
    }).catch(console.error)
}

function onMidiMessage(this: MIDIInput, ev: MIDIMessageEvent) {
    console.log('midi message: ', this);
    console.log('event: ', ev);
    let [_, input, value] = ev.data;
    return ev as any
}