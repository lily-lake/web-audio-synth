import { ChangeEvent, useState } from 'react'
import './App.scss'
import Osc1 from './components/Osc1';
let audioContext = new AudioContext()
let out = audioContext.destination
let osc1 = audioContext.createOscillator();
let gain1 = audioContext.createGain();

osc1.connect(gain1)
gain1.connect(out)

function App() {
  const [osc1Settings, setOsc1Settings] = useState({
    frequency: osc1.frequency.value,
    detune: osc1.detune.value
  })

  const changeOsc1 = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, id } = e.target;
    setOsc1Settings({ ...osc1Settings, [id]: value });
    osc1[id].value = value;
  }

  return (
    <>
      <h1>Placeholder</h1>
      <button onClick={() => osc1.start()}>Start</button>
      <button onClick={() => osc1.stop()}>Stop</button>
      <Osc1 change={changeOsc1} settings={osc1Settings} />
    </>
  )
}

export default App
