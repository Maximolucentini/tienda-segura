const express = require("express");
// API de solo lectura (GET), sin cookies ni sesión: CSRF no aplica.
const app = express();// nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage

const total = (precio, cant, desc) =>
    precio * cant * (1 + desc);

app.get("/total", (req, res) => {
    const { p, c } = req.query;
    res.json({ total: total(p, c, 0) });
});

module.exports = { app, total };