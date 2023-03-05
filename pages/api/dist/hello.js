"use strict";
exports.__esModule = true;
exports.hello = void 0;
function hello(req, res) {
    res.status(200).json({ text: 'Hello' });
}
exports.hello = hello;
