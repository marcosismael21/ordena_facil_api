const { Router } = require('express')

const router = Router();

const rolRoutes = require('./rol.routes')
const colaboradorRoutes = require('./colaborador.routes')
const tipoPlatilloRoutes = require('./tipoPlatillo.routes')

router.use('/api/rol', rolRoutes)
router.use('/api/colaborador', colaboradorRoutes)
router.use('/api/tipoPlatillo', tipoPlatilloRoutes)

module.exports = router