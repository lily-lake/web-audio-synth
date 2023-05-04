import { useContext } from 'react';
import { CTX } from '../Store'

const Context = () => {
    const [appState, updateState] = useContext(CTX);

    return (
        <div>
            <h2>Audio Context</h2>
            <button onClick={() => updateState({ type: "START_CONTEXT" })}>Start</button>
            <button onClick={() => updateState({ type: "STOP_CONTEXT" })}>Stop</button>
        </div>
    )
}

export default Context