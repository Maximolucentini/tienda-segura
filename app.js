const express = require("express");
// API de solo lectura (GET), sin cookies ni sesión: CSRF no aplica.
const app = express(); // nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
// Encabezados de seguridad en todas las respuestas (hallazgos de ZAP).
app.disable("x-powered-by");
app.use((req, res, next) => {
    res.set({
        "X-Content-Type-Options": "nosniff",
        "Cross-Origin-Resource-Policy": "same-origin",
        "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
        "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; form-action 'none'",
        "Cache-Control": "no-store",
    });
    next();
});
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
// Respuesta propia para rutas inexistentes (en JSON y con los mismos encabezados).
app.use((req, res) => {
    res.status(404).json({ error: "No encontrado" });
});
// Solo arranca el servidor si se ejecuta "node app.js" (no cuando lo importa el test).
if (require.main === module) {
    app.listen(3000, () => console.log("Tienda escuchando en http://localhost:3000"));
}
module.exports = { app, total };