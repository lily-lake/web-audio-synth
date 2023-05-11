import React, { useState, useContext, createContext, PropsWithChildren } from 'react'
import { MIDIAccess } from './midi'

const midi = new MIDIAccess()
midi.start();
const MidiContext = createContext(midi);

const useMidiContext = () => useContext(MidiContext)

const MidiContextProvider = (props: PropsWithChildren) => {
    return <MidiContext.Provider value={midi}>{props.children}</MidiContext.Provider>
}

const MidiMap = () => {
    return (
        <MidiContextProvider>

            <div>MidiMap</div>
        </MidiContextProvider>
    )
}

export default MidiMap