import './App.scss'
import Osc1 from './components/web-audio-api/Osc1';
import LFO1 from './components/web-audio-api/LFO1';
import Filter from './components/web-audio-api/Filter';
import Keyboard from './components/Keyboard';
import ADSR from './components/web-audio-api/ADSR';
import Gain from './components/web-audio-api/Gain';
import Distortion from './components/web-audio-api/Distortion';
import Compressor from './components/web-audio-api/Compressor';
// import Synth from './components/Synth';
import { distortion, compressor, actx } from './Store';
import MidiMap from './components/MidiMap';
import { MidiContextProvider } from './components/MidiMap/midi';
function App() {
  return (
    <MidiContextProvider>
      <>
        <h1>Oscillator</h1>
        {/* <Synth /> */}
        <MidiMap />
        <div className="controls">
          <Gain />
          <Distortion waveShaper={distortion} />
          <Compressor compressor={compressor} audioContext={actx} />
          <Osc1 />
          <LFO1 />
          <ADSR />
          <Filter />
        </div>
        <Keyboard />
      </>
    </MidiContextProvider>
  )
}

export default App
