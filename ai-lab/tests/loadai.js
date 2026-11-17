// Loads the site's JS files into a fake-window context so datasets/scoring can be unit-tested in Node.
const vm = require('vm'), fs = require('fs'), path = require('path');
const ctx = { console, Math, JSON, Date, setTimeout, setInterval: () => {}, localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} }, document: { addEventListener() {}, hidden: false, querySelector() { return null; } }, Image: function () {}, requestAnimationFrame: () => {} };
ctx.window = ctx; ctx.addEventListener = () => {};
vm.createContext(ctx);
module.exports = function (files) { files.forEach((f) => vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'), ctx, { filename: f })); return ctx.AI; };
