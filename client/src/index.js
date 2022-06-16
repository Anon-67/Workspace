import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { Provider } from "react-redux"
import store from './store';
import actionCable from 'actioncable'

const CableApp = {}
CableApp.cable = actionCable.createConsumer("wss://localhost:3000/cable")
export const ActionCableContext = createContext()



ReactDOM.render(
  <Provider store={store}>
    <ActionCableContext.Provider value={CableApp.cable}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ActionCableContext.Provider>
  </Provider>,
  document.getElementById('root')
);

