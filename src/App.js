import React from 'react';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Signup from './component/Signup/Signup'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;