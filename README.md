# Interactive Drawing Application

A React-based drawing application built using the HTML5 Canvas API. Users can create drawings using multiple tools, save their work locally, reload saved drawings, and export artwork as PNG images.

## Features

* Freehand drawing (Pen Tool)
* Eraser Tool
* Line Tool
* Rectangle Tool
* Circle Tool
* Color Picker
* Adjustable Brush Size
* Undo Functionality
* Clear Canvas
* Save Drawings to Local Storage
* Gallery View for Saved Drawings
* Load Saved Drawings from Gallery
* Export Drawings as PNG Images

## Technologies Used

* React
* JavaScript (ES6+)
* HTML5 Canvas API
* Tailwind CSS
* Local Storage API

## Project Structure

```text
src/
├── components/
│   ├── Canvas/
│   │   └── Canvas.jsx
│   ├── Toolbar/
│   │   └── Toolbar.jsx
│   └── Gallery/
│       └── Gallery.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SivaRamaChakradhar/Interactive-Drawing-Application-with-Canvas-API
```

### 2. Navigate to the Project Directory

```bash
cd my-drawing-app
```

### 3. Install Dependencies

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Usage

1. Select a drawing tool from the toolbar.
2. Choose a color and brush size.
3. Draw on the canvas.
4. Use Undo to revert the last action.
5. Use Clear to reset the canvas.
6. Save drawings to store them in the gallery.
7. Click a gallery thumbnail to load a saved drawing.
8. Export the current drawing as a PNG file.

## Future Enhancements

* Redo Functionality
* Shape Preview While Drawing
* Delete Drawings from Gallery
* Keyboard Shortcuts
* Infinite Canvas Support
* Backend Storage Integration
* User Authentication

## Author

**Ramisetti Siva Rama Chakradhar**
