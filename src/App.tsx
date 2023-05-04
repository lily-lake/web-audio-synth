import './App.scss'
import Osc1 from './components/Osc1';
import Filter from './components/Filter';
// import Context from './components/Context';
import Keyboard from './components/Keyboard';
import ADSR from './components/ADSR';

function App() {


  return (
    <>
      <h1>Oscillator</h1>
      {/* <Context /> */}
      <div className="controls">
        <Osc1 />
        <ADSR />
        <Filter />
      </div>
      <Keyboard />
    </>
  )
}

export default App
