import { useContext } from 'react';
import { CTX } from '../Store'

const Context = () => {
    const { updateState } = useContext(CTX);

    return (
        <div>
            <h2>Audio Context</h2>
            <button onClick={() => updateState({ type: 'START_CONTEXT', payload: '' })}>Start</button>
            <button onClick={() => updateState({ type: 'STOP_CONTEXT', payload: '' })}>Stop</button>
        </div>
    )
}

export default Context