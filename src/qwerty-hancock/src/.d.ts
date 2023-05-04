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

interface QwertyHancock {
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

// type QwertyHancockFunction = (input: QwertyHancockInput) => QwertyHancock;

export function QwertyHancock(input: QwertyHancockInput): QwertyHancock;
