const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Permitir peticiones desde tu frontend en Netlify
app.use(cors());
app.use(express.json());

// Reemplaza 'TU_API_KEY_AQUI' por tu clave API real de JustAnotherPanel
const JAP_API_KEY = process.env.JAP_API_KEY || 'TU_API_KEY_AQUI';
const JAP_API_URL = 'https://justanotherpanel.com/api/v2';

app.get('/', (req, res) => {
    res.send('Backend del Panel SMM activo y listo.');
});

// Ruta de la API para recibir órdenes desde el frontend
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
        console.error('Error enviando la orden a JAP:', error);
        res.status(500).json({ error: 'Error al conectar con el servidor de JustAnotherPanel.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
