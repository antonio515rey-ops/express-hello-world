const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS para permitir peticiones desde Netlify
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el servidor responde
app.get('/', (req, res) => {
    res.send('Backend de SMM funcionando correctamente');
});

// Ruta para procesar el pedido
app.post('/api/order', async (req, res) => {
    try {
        const { service, link, quantity } = req.body;

        // Aquí puedes integrar después tu lógica con la API de JAP
        console.log('Pedido recibido:', { service, link, quantity });

        // Respondemos con éxito simulado (o con la respuesta de JAP)
        res.json({
            status: "success",
            order: Math.floor(Math.random() * 100000), // ID de orden simulado
            message: "Pedido registrado con éxito en el servidor"
        });

    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ error: 'Error interno al procesar el pedido' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
