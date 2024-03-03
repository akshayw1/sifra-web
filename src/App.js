import logo from './logo.svg';
import './App.css';
import VoiceRecorder from './components/VoiceRecorder';
import { Avatar } from './components/Avatar';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';

import John from './pages/John';
import Sifra from './pages/Sifra';
import Nitin from './pages/Nitin';

function App() {
const mainScreenlayout = ()=>{
  <></>
}

  return (
    <Router>
      <>
        {/* <Avatar/> */}
        {/* <Landing/> */}
        {/* <NavBar /> */}
        <Routes>
          <Route path="/sifra" element={<Sifra/>} />
          <Route path="/john" element={<John/>} />
          <Route path="/nitin" element={<Nitin/>} />
          {/* <Route path="/sifra" component= />
          <Route path="/sakshi" component= />
          <Route path="/pooja" component={VoiceRecorder} /> */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
