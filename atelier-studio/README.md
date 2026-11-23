# Atelier Studio

A fashion design studio for students. The logo (`assets/logo-full.jpg`) and the app icons come from the designer's own logo, and the 3D fabric look (dusty rose, soft matte sheen, gentle fold shading) is matched to it. Snapshot or upload a hand drawing, color it in
with real fabrics, and see it on a 3D mannequin. Atelier is French for a designer's workshop.

Open `index.html` (it is hosted with the rest of this site), or install the Windows app.
Everything works offline and designs are saved on the device.

## What it does

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
- **Fabric that flows:** skirts, dresses, loose tops, bell sleeves and wide trouser legs are
  simulated cloth. They hang from where they are sewn on, fall into folds, rest against the
  body, and swing when the mannequin moves.
  Each fabric drapes its own way (chiffon soft and floaty, taffeta full and crisp, denim
  and leather heavy). **Twirl**, **Sway** and **Breeze** buttons show the movement.
- **Sketch layer:** a drawing's lines come in on their own layer. Show or hide it, make it
  see-through, erase only the sketch, crop it to the part to keep, or clear it. Fill uses the
  lines as edges, but the sketch never shows on the fabric in 3D.
- **Left and right sides:** Left and Right tabs next to Front and Back. A side starts as the 3D
  garment seen from that side; once she adds fabric or color there it is its own design, and in
  3D the garment's sides show it (sleeves keep the front and back colors).
- **Front and back:** a Front/Back switch on the sketch board. The back matches the front
  (mirrored) until she draws or colors on it, then it is its own design (open backs, bows,
  different fabric). Pictures can be placed on either side. In 3D each side shows its drawing.
- **Editable measurements:** type a new bust, waist, hip, length, hem, sleeve or inseam
  measurement and the 3D garment reshapes to match. Changes are saved with the design and can
  be reset to the drawing's measurements.
- **Straight to 3D:** skip coloring and see the drawing in 3D right away.
- **17 starter outlines** that fit the mannequin: A-line dress, mini dress, ball gown, mermaid
  gown, T-shirt, tank top, crop top, bell-sleeve blouse, peplum top, blazer, long coat, skirt,
  pleated skirt, trousers, wide-leg trousers, shorts and jumpsuit.
- **Measurements** of the mannequin and the garment (bust, waist, hip, length, hem, sleeve,
  inseam) in inches or centimeters.
- **My designs and portfolio:** autosave, a gallery, star designs into the portfolio,
  copy, delete, and `.atelier` design files to move work between computers.
- **Export:** sketch PNG, 3D picture PNG, 3D model (GLB).
- **Sewing patterns:** drafted from the 3D garment and its measurements: bodice blocks with
  darts, skirt panels worked out from the real skirt shape (pencil to full circle), set-in
  sleeves, trousers with a crotch curve, waistbands. Seam allowance (5/8" / 1.5 cm) and hem
  allowance, grainlines, notches and fold lines. The PDF has a tech pack, fabric to buy for
  45" and 60" fabric, a cutting layout, supplies, a cost estimate, step-by-step sewing
  instructions and tips for each fabric, then the full-size pattern tiled onto Letter or A4
  pages (with a test square and page map) or as one big sheet for a print shop. Optional nested
  sizes. Also SVG and DXF files for pattern software and cutting machines.
- **Portfolio, Window Shopping:** every starred design stands in its own boutique window
  along a street; tap one for front/back/sketch views, fabrics, measurements and notes.
- **Portfolio, Runway:** a 3D show: each look walks the runway, poses, twirls and walks back
  with lights, an audience, camera flashes, a name card and music (made in the browser).
- **AI 3D (online, optional):** sends the front drawing to the Hunyuan3D-2 model on Hugging
  Face and shows the free-form 3D model it makes. Saved with the design, so it can be viewed
  offline afterwards. A Hugging Face token can be added for more free tries.

Everything except AI 3D works without the internet.

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
- `src/cloth.js` - the cloth simulation
- `src/pattern.js` - drafting pattern pieces, yardage, supplies and sewing steps
- `src/patternpdf.js` - the pattern PDF, SVG and DXF files
- `src/portfolio.js` - Window Shopping
- `src/runway.js` - the Runway show
- `src/ai3d.js` - the optional online AI 3D model
- `src/starters.js` - starter outlines
- `src/store.js` - saving designs on the device and design files
- `desktop/` - the Windows app (Electron)
