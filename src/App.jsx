import { useState } from 'react';

import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Canvas/Canvas';

import './index.css';

const App = () => {
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [undoCount, setUndoCount] = useState(0)

  const handleUndo = () => {
    setUndoCount(undoCount + 1);
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="p-6">
        <Toolbar
          tool={tool}
          color={color}
          brushSize={brushSize}
          setTool={setTool}
          setColor={setColor}
          setBrushSize={setBrushSize}
          onUndo={handleUndo}
        />
      </header>

      <main className="flex-grow">
        <Canvas
          tool={tool}
          color={color}
          brushSize={brushSize}
          undoCount = {undoCount}
        />
      </main>
    </div>
  );
}

export default App;