const validatePlatform = (req, res, next) => {
    // Verifica si la ruta comienza con /api-web o /api-mobile
    const platform = req.baseUrl.startsWith('/api-web') ? 'web' : 
                    req.baseUrl.startsWith('/api-mobile') ? 'mobile' : null
    
    if (!platform) {
        return res.status(403).json({ error: 'Invalid platform access' })
    }

    //req.platform = platform;
    next()
}

module.exports = validatePlatform