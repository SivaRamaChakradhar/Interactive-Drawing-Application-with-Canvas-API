import { FiPenTool, FiTrash2, FiMinus, FiSquare, FiCircle } from 'react-icons/fi';
import { IoMdUndo } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";
import { CiSaveDown1, CiExport } from "react-icons/ci";

const Toolbar = ({ tool, color, brushSize, setTool, setColor, setBrushSize, onUndo, onClear, onSave, onExport }) => {
    const tools = [
        { id: 'pen', testid: 'tool-pen', label: 'Pen', Icon: FiPenTool },
        { id: 'eraser', testid: 'tool-eraser', label: 'Eraser', Icon: FiTrash2 },
        { id: 'line', testid: 'tool-line', label: 'Line', Icon: FiMinus },
        { id: 'rectangle', testid: 'tool-rectangle', label: 'Rectangle', Icon: FiSquare },
        { id: 'circle', testid: 'tool-circle', label: 'Circle', Icon: FiCircle },
    ];

    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-700 bg-slate-900/95 p-4 shadow-xl shadow-black/20 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
                {tools.map(({ id, label, Icon, testid }) => {
                    const active = tool === id;
                    return (
                        <button
                            data-testid={testid}
                            key={id}
                            type="button"
                            onClick={() => setTool(id)}
                            className={`flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-3xl border px-3 py-2 text-xs transition-all duration-200 ${active ? 'border-blue-400 bg-slate-800 text-white shadow-lg shadow-blue-500/20' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500 hover:bg-slate-900'}`}>
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-slate-200">
                                <Icon className="h-5 w-5" />
                            </span>
                            <span>{label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
                <button
                    data-testid="undo-button"
                    onClick={onUndo}
                    type="button"
                    className={`flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-3xl border px-3 py-2 text-xs transition-all duration-200`}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-slate-200">
                        <IoMdUndo className="h-5 w-5" />
                    </span>
                    <span>Undo</span>
                </button>
                <button
                    data-testid="clear-canvas-button"
                    onClick={onClear}
                    type="button"
                    className={`flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-3xl border px-3 py-2 text-xs transition-all duration-200`}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-slate-200">
                        <MdOutlineClear className="h-5 w-5" />
                    </span>
                    <span>Clear</span>
                </button>
                <button
                    data-testid="save-storage-button"
                    onClick={onSave}
                    type="button"
                    className={`flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-3xl border px-3 py-2 text-xs transition-all duration-200`}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-slate-200">
                        <CiSaveDown1 className="h-5 w-5" />
                    </span>
                    <span>Save</span>
                </button>
                <button
                    data-testid="sexport-png-button"
                    onClick={onExport}
                    type="button"
                    className={`flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-3xl border px-3 py-2 text-xs transition-all duration-200`}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-slate-200">
                        <CiExport className="h-5 w-5" />
                    </span>
                    <span>Export</span>
                </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="flex items-center gap-3 rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200">
                    <span>Color</span>
                    <input
                        data-testid="color-picker"
                        type="color"
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
                        className="h-10 w-14 cursor-pointer rounded-xl border border-slate-700 bg-white p-0"
                    />
                </label>

                <label className="flex items-center gap-4 rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200">
                    <span>Brush size</span>
                    <input
                        data-testid="brush-size-slider"
                        type="range"
                        min="1"
                        max="50"
                        value={brushSize}
                        onChange={(event) => setBrushSize(Number(event.target.value))}
                        className="h-2 w-36 accent-blue-500"
                    />
                    <span className="w-8 text-right text-white">{brushSize}</span>
                </label>
            </div>
        </div>
    );
};

export default Toolbar;