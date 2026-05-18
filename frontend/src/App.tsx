
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { LandingPage } from './screen/landingPage';
import { GamePage } from './screen/gamePage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/game' element={<GamePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
