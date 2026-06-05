import { useRef, useEffect, useState } from 'react';

const Canvas = (props) => {
    const { tool, color, brushSize, undoCount, clearCount, saveCount, selectedDrawing, exportCount, ...rest } = props;
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const historyRef = useRef([]);

    const startPointRef = useRef({ x: 0, y: 0 });

    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        undo()
    }, [undoCount]);

    useEffect(() => {
        clearCanvas();
    }, [clearCount])

    useEffect(() => {
        if(saveCount === 0) return;
        saveDrawings();
    }, [saveCount])

    useEffect(() => {
        if(exportCount === 0) return;
        exportPNG()
    }, [exportCount])

    const exportPNG = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL("image/png")

        const link = document.createElement('a');

        link.href = dataURL;
        link.download = `drawing-${Date.now()}.png`;

        link.click()
    }

    useEffect(() => {
        if (!selectedDrawing) return;

        const canvas = canvasRef.current;
        const context = contextRef.current;

        if (!canvas || !context) return;

        const image = new Image();

        image.src = selectedDrawing;

        image.onload = () => {
            clearCanvas();

            historyRef.current = [];

            const scale = Math.min(
                canvas.width / image.width,
                canvas.height / image.height
            );

            const drawWidth = image.width * scale;
            const drawHeight = image.height * scale;

            const x = (canvas.width - drawWidth) / 2;
            const y = (canvas.height - drawHeight) / 2;

            context.drawImage(
                image,
                x,
                y,
                drawWidth,
                drawHeight
            );

            saveState();
        };
    }, [selectedDrawing]);



    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';

        context.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
        context.lineCap = 'round';
        context.lineWidth = brushSize;
        context.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
        contextRef.current = context;
        saveState();
    }, []);

    useEffect(() => {
        if (!contextRef.current) return;

        contextRef.current.lineWidth = brushSize;
    }, [brushSize]);

     useEffect(() => {
        if (!contextRef.current) return;

        contextRef.current.globalCompositeOperation =
            tool === 'eraser'
                ? 'destination-out'
                : 'source-over';

        contextRef.current.strokeStyle =
            tool === 'eraser'
                ? '#ffffff'
                : color;
    }, [tool, color]);

    const saveState = () => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        historyRef.current.push(
            canvas.toDataURL()
        );
    };

    const saveDrawings = () => {
        if (historyRef.current.length <= 1) {
            alert('Draw something first');
            return;
        }
        try {
            const canvas = canvasRef.current;

            if (!canvas) return;

            const dataURL = canvas.toDataURL(
                'image/jpeg',
                0.5
            );

            const drawings = localStorage.getItem('drawings');

            const drawingsArray =
                drawings
                    ? JSON.parse(drawings)
                    : [];

            drawingsArray.push(dataURL);

            localStorage.setItem(
                'drawings',
                JSON.stringify(drawingsArray)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const undo = () => {
        const canvas = canvasRef.current;

        if(!canvas){
            return;
        }

        if(historyRef.current.length <= 1){
            return;
        }
        
        historyRef.current.pop();

        const previousState = historyRef.current[historyRef.current.length - 1];

        const image = new Image();
        image.src = previousState;
        image.onload = () => {
            const context = contextRef.current;

            context.save();

            context.setTransform(1, 0, 0, 1, 0, 0);

            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            context.drawImage(
                image,
                0,
                0
            );

            context.restore();
        };
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;

        if (!canvas || !context) return;

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.fillStyle = '#ffffff';

        context.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        historyRef.current = [];
        saveState();
    };

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        startPointRef.current = { x: offsetX, y: offsetY };
        if (!contextRef.current) return;
        if (tool === 'pen' || tool === 'eraser') {
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
        }
        setIsDrawing(true);
    }

    const draw = ({nativeEvent}) => {
        if (
            !isDrawing ||
            !contextRef.current ||
            (tool !== 'pen' && tool !== 'eraser')
        ) {
            return;
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    const finishDrawing = ({nativeEvent}) => {
        if (!contextRef.current || !isDrawing) return;
        const {offsetX, offsetY} = nativeEvent;
        const startPoint = startPointRef.current;
        if(tool === 'line') {

            contextRef.current.beginPath();
            
            contextRef.current.moveTo(startPoint.x, startPoint.y);
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
        else if(tool === 'rectangle'){

            contextRef.current.beginPath();
            
            contextRef.current.strokeRect(
                startPoint.x,
                startPoint.y,
                offsetX - startPoint.x,
                offsetY - startPoint.y
            );
        }
        else if(tool === 'circle'){
            contextRef.current.beginPath();
            
            const radius = Math.sqrt(
                Math.pow(offsetX - startPoint.x, 2) + Math.pow(offsetY - startPoint.y, 2)
            );
            contextRef.current.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
            contextRef.current.stroke();
        }
        contextRef.current.closePath();
        saveState();
        setIsDrawing(false);
    }

    return (
        <canvas
            data-testid="drawing-canvas"
            onMouseMove={draw}
            onMouseUp={finishDrawing}
            onMouseDown={startDrawing}
            onMouseLeave={finishDrawing}
            {...rest}
            ref={canvasRef}
            className="block h-full w-full bg-white"
        />
    );
}

export default Canvas;