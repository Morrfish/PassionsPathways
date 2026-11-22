# Shelf Swap

A physical-media collection tracker (VHS, Betamax, LaserDisc, CED, DVD, HD DVD, Blu-ray, 4K, cassette, vinyl) with real swapping between friends. It's inspired by ReelSwap and adds swap matching, which ReelSwap doesn't have.

Open `index.html`, or the hosted site. It works offline and can be installed from the browser as an app. All data stays on the device.

## Change it yourself

- **`config.js`**: app name, tagline, accent color, currency, the list of formats (with spine color and case size), conditions, case styles, the fair-swap range, and price lookup links. Save and reload.
- **Settings tab**: change the name, colors, theme and collector name without touching code.

## Features

- **Collection**: 3D wooden shelf (spines sized by format), grid of covers, or a list. Search, filter by format, sort, plus quick filters (for swap, sealed, no photo, no value).
- **Items**: title, format, year, distributor, barcode, condition, case, paid, value, tags, notes, spine color, and front, spine and back photos. Photos are shrunk and stripped of GPS data. Duplicate warnings and eBay price lookup links are built in.
- **Barcode scanning** with the camera in browsers that support it (Chrome on Android, Edge). Elsewhere you type the barcode in.
- **3D case viewer**: drag to spin the case, using your photos as its faces.
- **Wantlist** with Grail, Want and Maybe priorities and a max price. It shows when a friend has a title for swap, and offers to remove a want when you add that title.
- **Swap**:
  1. Share a swap card: a link or code with your for-swap items and your wantlist.
  2. Load a friend's card. Matches on both wantlists are picked automatically.
  3. A value balance shows whether the swap is fair.
  4. Copy an offer message.
  5. Record the swap. Items move between shelves automatically, and the swap goes into your history.
- **View-only shelf link** to show off your collection.
- **Stats**: totals, value vs. paid, by format, by decade, and your most valuable items.
- **Backup**: JSON backup and restore, and CSV export and import for spreadsheets.
