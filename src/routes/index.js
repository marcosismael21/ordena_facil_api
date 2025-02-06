const { Router } = require('express')

const router = Router();

const rolRoutes = require('./rol.routes')
const colaboradorRoutes = require('./colaborador.routes')

router.use('/api/rol', rolRoutes);
router.use('/api/colaborador', colaboradorRoutes);

module.exports = router