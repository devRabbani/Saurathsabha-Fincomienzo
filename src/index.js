import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import FirebaseContext from './context/firebase'
import { firebaseApp, storage } from './lib/firebase'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContext.Provider value={{ firebaseApp, storage }}>
        <App />
      </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
