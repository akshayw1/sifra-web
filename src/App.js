import logo from './logo.svg';
import './App.css';
import VoiceRecorder from './components/VoiceRecorder';
import { Avatar } from './components/Avatar';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Models from './pages/models'
import About from './pages/About'
import Profile from './pages/Profile'
// import SignIn from './pages/Signin'

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
        <Route path="/" element={<Home/>} />
          <Route path="/sifra" element={<Sifra/>} />
          <Route path="/john" element={<John/>} />
          <Route path="/nitin" element={<Nitin/>} />
          <Route path='/about' element={<About/>}/>
      <Route path='/models' element={<Models/>}/>
      <Route path='/profile' element={<Profile/>}/>
      {/* <Route path='/signin' element={<Signin/>}/>
      <Route path='/signout' element={<Signout/>}/> */}
          {/* <Route path="/sifra" component= />
          <Route path="/sakshi" component= />
          <Route path="/pooja" component={VoiceRecorder} /> */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
