import {useState, useEffect} from 'react';

const Gallery = ({ saveCount, onSelectDrawing }) => {
    const [drawings, setDrawings] = useState([]);

    useEffect(() => {
        try {
            const storedDrawings =
                localStorage.getItem('drawings');

            if (storedDrawings) {
                setDrawings(
                    JSON.parse(storedDrawings)
                );
            }
        } catch (error) {
            console.log(error);
        }
    }, [saveCount]);

    if (drawings.length === 0) {
        return (
            <div
                data-testid="gallery-container"
                className="p-4 text-center text-slate-400"
            >
                No drawings saved yet
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4" data-testid="gallery-container">
            {drawings.map((drawing, index) => (
                <div
                    key={index}
                    onClick={()=>onSelectDrawing(drawing)}
                    className="overflow-hidden rounded-lg border cursor-pointer"
                    data-testid={`gallery-item-${index}`}
                >
                    <img
                        src={drawing}
                        alt={`Drawing ${index + 1}`}
                        className="h-40 w-full object-contain rounded-lg bg-white"
                    />
                </div>
            ))}
        </div>
    )
}

export default Gallery;