const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Habilitar CORS para recibir peticiones desde tu frontend en Netlify
app.use(cors());
app.use(express.json());

// Tu API Key de JustAnotherPanel
const JAP_API_KEY = process.env.JAP_API_KEY || 'TU_API_KEY_DE_JAP';
const JAP_API_URL = 'https://justanotherpanel.com/api/v2';

app.get('/', (req, res) => {
    res.send('Backend del Panel SMM funcionando.');
});

// Ruta que recibe el pedido desde el frontend en Netlify
app.post('/api/order', async (req, res) => {
    const { service, link, quantity } = req.body;

    try {
        const response = await fetch(JAP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                key: JAP_API_KEY,
                action: 'add',
                service: service,
                link: link,
                quantity: quantity
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error enviando orden a JAP:', error);
        res.status(500).json({ error: 'Error al conectar con la API del proveedor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
