import { useContext, useEffect, useState } from 'react'
import { CTX } from '../Store.js'
import AudioKeys from 'audiokeys'
import Qwerty from '../qwerty-hancock/Keyboard'


const Keyboard = () => {
    const { updateState } = useContext(CTX);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const keyboard = new AudioKeys({})

        keyboard.down((note: AudioKeysNoteData) => {
            // console.log('note: ', note)
            updateState({ type: "MAKE_OSC", payload: { frequency: note.frequency } })
            // updateState({ type: "PLAY_SYNTH", payload: { frequency: note.frequency, duration: "8n" } })
        });
        keyboard.up((note: AudioKeysNoteData) => {
            updateState({ type: "KILL_OSC", payload: { frequency: note.frequency } })
            // updateState({ type: "STOP_SYNTH", payload: { frequency: note.frequency, duration: "8n" } })
        })
    }, [])
    return (
        <div>
            <button onClick={() => setMobile(!mobile)}>{mobile ? "hide mobile keyboard" : "show mobile keyboard"}</button>
            {mobile && <Qwerty />}
        </div>
    )
}

export default Keyboard