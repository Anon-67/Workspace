import Header from '../Header/Header';
import './App.css';
import {useEffect} from "react"
import Content from '../Content/Content';
import { useDispatch} from 'react-redux';
import { setUser } from '../util/reducer';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => dispatch(setUser(user)));
      }
    });
  }, [dispatch]);

  return (
    <>
    <Header />
    <Content />
    </>

  );
}

export default App;
