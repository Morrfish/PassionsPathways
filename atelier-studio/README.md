# Atelier Studio

A fashion design studio for students. Snapshot or upload a hand drawing, color it in
with real fabrics, and see it on a 3D mannequin. Atelier is French for a designer's workshop.

Open `index.html` (it is hosted with the rest of this site), or install the Windows app.
Everything works offline and designs are saved on the device.

## What it does (Phase 1)

- **Snapshot or upload** a drawing. The paper is cleaned up and it comes in as a lined
  sketch to color, or with its colors kept if it is already colored in. Drag and drop or
  paste a picture also works.
- **Place it** on the mannequin guide: drag to move, drag a corner or pinch to resize.
- **Color it:** tap-to-fill like a coloring book (small gaps in lines are closed), brush,
  line pen, eraser, clear-a-shape, color picker, exact hex codes, palettes, undo/redo,
  pen pressure, pinch zoom.
- **32 fabrics:** her list (satin, three laces, sequin, glitter, corduroy, linen, silk,
  tissue, velvet, taffeta, lamé, leather, denim) plus sheers, textured fabrics and prints.
  In 3D they shine, sparkle or show through like the real thing.
- **3D on a mannequin:** women's, men's and kids' bodies, sizes XS-4XL (kids 4-14),
  petite/regular/tall, skin tones or a dress form, and custom measurements. Switch between
  Sketch and 3D any time; tap the garment in 3D to change its fabric.
- **Fabric that flows:** skirts and dresses are simulated cloth. They hang from the waist,
  fall into folds, rest against the hips and legs, and swing when the mannequin moves.
  Each fabric drapes its own way (chiffon soft and floaty, taffeta full and crisp, denim
  and leather heavy). **Twirl**, **Sway** and **Breeze** buttons show the movement.
- **Straight to 3D:** skip coloring and see the drawing in 3D right away.
- **Starter outlines** that fit the mannequin: A-line dress, ball gown, T-shirt, skirt, trousers.
- **Measurements** of the mannequin and the garment (bust, waist, hip, length, hem, sleeve,
  inseam) in inches or centimeters.
- **My designs and portfolio:** autosave, a gallery, star designs into the portfolio,
  copy, delete, and `.atelier` design files to move work between computers.
- **Export:** sketch PNG, 3D picture PNG, 3D model (GLB).

Coming next (see the design document): editable measurements that reshape the pattern,
more garment types, sewing pattern export with yardage and cutting layouts, Window
Shopping and Runway portfolio modes, and an optional online AI 3D button.

## Building

```
npm ci
npm run build        # bundles src/ into index.html, app.js, style.css, sw.js
```

The Windows installer and portable exe are built by the
`.github/workflows/atelier-studio-exe.yml` workflow on every push that changes this
folder. Download them from the workflow run's page (artifact `AtelierStudio-Windows`).
To try the desktop app locally: `cd desktop && npm ci && npm start`.

## Files

- `src/app.js` - the user interface and how the pieces connect
- `src/board.js` - the sketch board: layers, fill, brushes, undo, placing a drawing
- `src/imageproc.js` - cleaning up a photo of a drawing into lines and colors
- `src/fabrics.js` - the fabric library (each fabric is a small generated tile)
- `src/body.js` - size charts and the mannequin's shape
- `src/viewer3d.js` - the 3D mannequin and the garment built from the drawing
- `src/cloth.js` - the cloth simulation for skirts and dresses
- `src/starters.js` - starter outlines
- `src/store.js` - saving designs on the device and design files
- `desktop/` - the Windows app (Electron)
