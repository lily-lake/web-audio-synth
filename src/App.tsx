import './App.scss'
import Osc1 from './components/Osc1';
import Filter from './components/Filter';
import Keyboard from './components/Keyboard';
import ADSR from './components/ADSR';
import LogarithmicKnob from './components/logarithmic-inputs/LogarithmicKnob';
import Gain from './components/Gain';
import Compressor from './components/Compressor';
function App() {



  return (
    <>
      <h1>Oscillator</h1>
      <div className="sliders">
        <LogarithmicKnob />
      </div>
      <div className="controls">
        <Gain />
        <Compressor />
        <Osc1 />
        <ADSR />
        <Filter />
      </div>
      <Keyboard />
    </>
  )
}

export default App
