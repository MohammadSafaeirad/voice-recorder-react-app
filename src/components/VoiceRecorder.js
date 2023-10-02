import React, { useState, useRef } from 'react';

function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorder = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = handleDataAvailable;
        mediaRecorder.current.start();
        setRecording(true);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setAudioURL(URL.createObjectURL(event.data));
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>▶️</button>
      <button onClick={stopRecording} disabled={!recording}>⏸️</button>
      {audioURL && <audio src={audioURL} controls />}
    </div>
  );
}

export default VoiceRecorder;
