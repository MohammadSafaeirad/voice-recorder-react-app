import logo from './logo.svg';
import './App.css';
import React from 'react';
import VoiceRecorder from './components/VoiceRecorder';

function App() {
  return (
    <div className="App">
      <h1>Voice Recorder App</h1>
      <VoiceRecorder />
      {/* Other components or content you might have */}
    </div>
  );
}

export default App;

