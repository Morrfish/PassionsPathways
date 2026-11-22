// ============================================================
//  SHELF SWAP SETTINGS — change anything in this file.
//  Save the file and reload the page to see your changes.
//  (Most of these can also be changed in the app's Settings tab.)
// ============================================================
window.SHELF_CONFIG = {
  // App name shown in the header and the browser tab.
  appName: "Shelf Swap",
  tagline: "Track it. Shelve it. Swap it.",

  // Main accent color (any CSS color).
  accent: "#e4572e",

  // Your collector name, shown on swap cards you share.
  collectorName: "Collector",

  // Money symbol used everywhere.
  currency: "$",

  // Media formats. color = spine color on the 3D shelf.
  // w/h/d = case size in shelf units (VHS is the biggest).
  formats: [
    { id: "vhs",      label: "VHS",          color: "#2b2b2b", w: 26, h: 190, d: 105 },
    { id: "beta",     label: "Betamax",      color: "#4a3b2a", w: 22, h: 160, d: 100 },
    { id: "laser",    label: "LaserDisc",    color: "#b8b8c8", w: 10, h: 300, d: 300 },
    { id: "ced",      label: "CED",          color: "#6d5a8a", w: 14, h: 300, d: 300 },
    { id: "dvd",      label: "DVD",          color: "#1d4e89", w: 14, h: 190, d: 135 },
    { id: "hddvd",    label: "HD DVD",       color: "#9e1b1b", w: 12, h: 170, d: 135 },
    { id: "bluray",   label: "Blu-ray",      color: "#1565c0", w: 12, h: 170, d: 135 },
    { id: "uhd",      label: "4K Ultra HD",  color: "#111111", w: 12, h: 170, d: 135 },
    { id: "cassette", label: "Audio Cassette", color: "#c77d1a", w: 16, h: 110, d: 70 },
    { id: "vinyl",    label: "Vinyl",        color: "#222222", w: 8,  h: 300, d: 300 }
  ],

  // Condition grades, best to worst.
  conditions: ["Sealed", "Mint", "Near Mint", "Very Good", "Good", "Fair", "Poor"],

  // Case styles you can pick from.
  caseTypes: ["Slipcover", "Clamshell", "Big Box", "Keep Case", "Steelbook", "Digipak", "Other"],

  // When checking if a swap is fair: how far apart (in percent)
  // the two sides' values can be and still count as "fair".
  fairTradePercent: 15,

  // Price lookup links (opens a search in a new tab).
  // {q} is replaced by the title + format.
  priceLinks: [
    { label: "eBay sold", url: "https://www.ebay.com/sch/i.html?_nkw={q}&LH_Sold=1&LH_Complete=1" },
    { label: "eBay live", url: "https://www.ebay.com/sch/i.html?_nkw={q}" }
  ]
};
