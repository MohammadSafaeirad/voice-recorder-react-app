import React, { useState, useRef } from 'react';

function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorder = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = event => {
          setAudioChunks(prev => [...prev, event.data]);
        };
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
        };
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

  const saveRecording = () => {
    const formData = new FormData();
    formData.append('file', new Blob([new Uint8Array(audioChunks)], { type: 'audio/webm' }), 'recording.webm');

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error("Error uploading recording:", error);
    });
  };

  return (
    <div>
        <button onClick={startRecording} disabled={recording}>▶️</button>
        <button onClick={stopRecording} disabled={!recording}>⏸️</button>
        {audioURL && <audio src={audioURL} controls />}
        {audioURL && <button onClick={saveRecording}>Save</button>}
    </div>
  );
}

export default VoiceRecorder;
