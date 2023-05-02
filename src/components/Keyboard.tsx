import React, { useContext, useEffect } from 'react'
import { CTX } from '../store'
import * as QwertyHancock from 'qwerty-hancock';
console.log("QwertyHancock: ", QwertyHancock)
// import { QwertyHancock } from 'qwerty-hancock';


const Keyboard = () => {
    const [appState, updateState] = useContext(CTX);

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
        keyboard.keyDown = (note, freq) => {
            updateState({ type: "MAKE_OSC", payload: { note, freq } })
        };
        keyboard.keyUP = (note, freq) => {
            updateState({ type: "KILL_OSC", payload: { note, freq } })
        }
    }, [])
    return (
        <div><div id="keyboard"></div></div>
    )
}

export default Keyboard