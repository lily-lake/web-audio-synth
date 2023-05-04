import { useContext, useEffect } from 'react'
import { CTX } from '../Store'
import * as QwertyHancock from 'qwerty-hancock';
console.log("QwertyHancock: ", QwertyHancock)
// import { QwertyHancock } from 'qwerty-hancock';


type QwertyHancockInput = {
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
declare global {
    interface Window {
        QwertyHancock: (input: QwertyHancockInput) => {
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

    }
}

const Keyboard = () => {
    const { updateState } = useContext(CTX);

    useEffect(() => {
        const keyboard = window.QwertyHancock({
            // const keyboard = new QwertyHancock({
            id: "keyboard",
            width: "450",
            height: "200",
            octaves: 2,
            startNote: "C4",
            whiteKeyColour: 'rgb(28, 198, 186)',
            blackKeyColour: 'rgb(10, 70, 67)',
            activeColour: 'rgb(166, 49, 172)',
            borderColour: 'white',

        });
        console.log(window)
        console.log("keyboard: ", keyboard)
        keyboard.keyDown = (note, frequency) => {
            updateState({ type: "MAKE_OSC", payload: { note, frequency } })
        };
        keyboard.keyUp = (note, frequency) => {
            updateState({ type: "KILL_OSC", payload: { note, frequency } })
        }
    }, [])
    return (
        <div><div id="keyboard"></div></div>
    )
}

export default Keyboard