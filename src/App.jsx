import { useState } from 'react';
import './App.css';
import { Router } from './router/Router';
import publicRoutes from './router/routes/publicRoutes';

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);  
  //Pass the routes to register, once registered they are returned
  return <Router allRoutes={allRoutes} />
}

export default App;
