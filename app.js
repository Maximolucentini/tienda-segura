const express = require("express");
// API de solo lectura (GET), sin cookies ni sesión: CSRF no aplica.
const app = express(); // nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage

const total = (precio, cant, desc) =>
    precio * cant * (1 - desc);

app.get("/total", (req, res) => {
    const { p, c } = req.query;
    res.json({ total: total(p, c, 0) });
});
app.get("/calcular", (req, res) => {
    const resultado = Number(req.query.a) + Number(req.query.b);
    res.json({ resultado });
});
// Solo arranca el servidor si se ejecuta "node app.js" (no cuando lo importa el test).
if (require.main === module) {
    app.listen(3000, () => console.log("Tienda escuchando en http://localhost:3000"));
}
module.exports = { app, total };