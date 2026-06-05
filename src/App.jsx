import { useState } from 'react';

import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Canvas/Canvas';
import Gallery from './components/Gallery/Gallery';

import './index.css';

const App = () => {
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [undoCount, setUndoCount] = useState(0);
  const [clearCount, setClearCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [exportCount, setExportCount] = useState(0);

  const handleUndo = () => {
    setUndoCount(undoCount + 1);
  }
  const handleClear = () => {
    setClearCount(clearCount + 1);
  }

  const handleSave = () => {
    setSaveCount(saveCount + 1);
  }

  const handleExport = () => {
    setExportCount(exportCount+1)
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
          onClear={handleClear}
          onSave={handleSave}
          onExport={handleExport}
        />
      </header>

      <main className="flex flex-1 overflow-hidden p-4 gap-4">
          {/* Canvas Area */}
          <section className="flex-1 rounded-xl overflow-hidden">
              <Canvas
                  tool={tool}
                  color={color}
                  brushSize={brushSize}
                  undoCount={undoCount}
                  clearCount={clearCount}
                  saveCount={saveCount}
                  selectedDrawing={selectedDrawing}
                  exportCount={exportCount}
              />
          </section>

          {/* Gallery */}
          <aside className="w-72 shrink-0 rounded-xl bg-slate-900 p-4 overflow-y-auto">
              <Gallery onSelectDrawing={setSelectedDrawing} saveCount={saveCount} />
          </aside>
      </main>
    </div>
  );
}

export default App;