const { Router } = require('express')

const router = Router();

const rolRoutes = require('./rol.routes')

router.use('/api/rol', rolRoutes);

module.exports = router