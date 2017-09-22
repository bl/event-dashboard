import React from 'react';
import { render } from 'react-dom';
import App from './App.js';

// client-side entry point used to load app and overrite server rendered
// "root" element
window.onload = () => {
  render(<App />, document.getElementById('root'));
};
