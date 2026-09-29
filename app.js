const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS para permitir peticiones desde Netlify
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Render!');
});

app.post('/api/order', async (req, res) => {
    const { service, link, quantity } = req.body;

    try {
        const formData = new URLSearchParams();
        formData.append('key', 'AQUI_TU_API_KEY_DE_JAP');
        formData.append('action', 'add');
        formData.append('service', service || '1');
        formData.append('link', link);
        formData.append('quantity', quantity);

        const response = await fetch('https://justanotherpanel.com/api/v2', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con la API de JAP' });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
