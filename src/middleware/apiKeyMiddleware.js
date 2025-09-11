const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    // Verifica si es una ruta web o mobile
    const isWebRoute = req.baseUrl.startsWith('/api-web');
    const isMobileRoute = req.baseUrl.startsWith('/api-mobile');
    
    // Verifica la API key correspondiente
    const validKey = isWebRoute ? process.env.API_KEY_WEB :
                    isMobileRoute ? process.env.API_KEY_MOBILE : null;

    if (!apiKey || apiKey !== validKey) {
        return res.status(401).json({ 
            error: 'Unauthorized - Invalid API Key' 
        });
    }
    next();
};

module.exports = validateApiKey;