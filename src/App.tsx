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
  const [osc1Freq, setOsc1Freq] = useState(osc1.frequency.value)
  const [osc1Detune, setOsc1Detune] = useState(osc1.detune.value)
  // osc1.start();

  const changeOsc1Freq = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    let value = parseInt(e.target.value);
    osc1.frequency.value = value;
    setOsc1Freq(value)
  }

  const changeOsc1Detune = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    let value = parseInt(e.target.value);
    osc1.detune.value = value;
    setOsc1Detune(value)
  }

  return (
    <>
      <h1>Placeholder</h1>
      <button onClick={() => osc1.start()}>Start</button>
      <button onClick={() => osc1.stop()}>Stop</button>
      <Osc1 changeFreq={changeOsc1Freq} freq={osc1Freq} changeDetune={changeOsc1Detune} detune={osc1Detune} />
    </>
  )
}

export default App
