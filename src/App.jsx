import { useEffect, useState } from 'react';
import './App.css';
import { Router } from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { get_user_info } from './store/Reducers/authReducer';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  //Pass the routes to register, once registered they are returned
  useEffect(() => {
    const privateRoutes = getRoutes();    
    setAllRoutes([...allRoutes, privateRoutes]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <Router allRoutes={allRoutes} />
}

export default App;
