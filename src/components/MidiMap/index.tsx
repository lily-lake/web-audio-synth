import { useMidiContext } from './midi'


const MidiMap = () => {
    const midiContext = useMidiContext();
    return (
        <div className="midimap-container control">
            <h2>MIDI Devices</h2>
            <ul>{midiContext.devices.map(device => <li>{device.name}</li>)}</ul>
        </div>
    )
}

export default MidiMap