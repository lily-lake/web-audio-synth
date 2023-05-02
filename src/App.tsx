import './App.scss'
import Osc1 from './components/Osc1';
import Filter from './components/Filter';
import Context from './components/Context';

function App() {


  return (
    <>
      <h1>Oscillator</h1>
      <Context />
      <Osc1 />
      <Filter
      />
    </>
  )
}

export default App
