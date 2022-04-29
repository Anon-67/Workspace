import Header from '../Header/Header';
import './App.css';
import {useState, useEffect} from "react"
import Content from '../Content/Content';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
    <Header user={user}/>
    <Content user={user} setUser={setUser}/>
    </>

  );
}

export default App;
