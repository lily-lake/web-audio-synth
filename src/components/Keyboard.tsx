import { useContext, useEffect, useState } from 'react'
import { CTX } from '../Store.js'
import AudioKeys from 'audiokeys'
import Qwerty from '../qwerty-hancock/Keyboard'

export type QwertyHancockInput = {
    id?: string,
    width?: string,
    height?: string,
    octaves?: number,
    startNote?: string,
    whiteKeyColour?: string,
    blackKeyColour?: string,
    activeColour?: string,
    borderColour?: string,
}

export interface QwertyHancock {
    version: string;

    keyDown: (note: string, frequency: number) => void;

    keyUp: (note: string, frequency: number) => void;

    setKeyOctave: (octave: number) => void;

    getKeyOctave: () => void;
    keyOctaveUp: () => void;
    keyOctaveDown: () => void;

    getKeyMap: () => void;
    setKeyMap: () => void;
}

type QwertyHancockFunction = (input: QwertyHancockInput) => QwertyHancock;

declare global {
    interface Window {
        QwertyHancock: QwertyHancockFunction;
    }
}



const Keyboard = () => {
    const { updateState } = useContext(CTX);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        // const keyboard = window.QwertyHancock({
        const keyboard = new AudioKeys({})

        keyboard.down((note: AudioKeysNoteData) => {
            console.log('note: ', note)
            updateState({ type: "MAKE_OSC", payload: { frequency: note.frequency } })
        });
        keyboard.up((note: AudioKeysNoteData) => {
            updateState({ type: "KILL_OSC", payload: { frequency: note.frequency } })
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