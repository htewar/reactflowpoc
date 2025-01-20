import React from 'react';
import FlowCanvas from './components/FlowCanvas';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <FlowCanvas />
    </div>
  );
};

export default App;
