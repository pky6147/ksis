import { useState } from 'react';
import './App.css'
import WebSocketTest from './components/WebSocketTest';

function App() {
  const [userId] = useState(() => `user_${Date.now()}`);

  return (
    <>
      <WebSocketTest userId={userId} />
    </>
  )
}

export default App
