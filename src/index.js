import React from 'react';
<<<<<<< HEAD
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './index.css';
import App from './App';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  )

  render(<Root />, document.getElementById('root'))
=======
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> 3a633ae4fabc7ecd305595adb4bce88f41839c8f
