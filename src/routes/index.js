const { Router } = require('express')

const router = Router();

const rolRoutes = require('./rol.routes')
const colaboradorRoutes = require('./colaborador.routes')
const tipoPlatilloRoutes = require('./tipoPlatillo.routes')
const platilloRoutes = require('./platillo.routes')
const platilloDetalleRoutes = require('./platilloDetalle.routes')

router.use('/api/rol', rolRoutes)
router.use('/api/colaborador', colaboradorRoutes)
router.use('/api/tipoPlatillo', tipoPlatilloRoutes)
router.use('/api/platillo', platilloRoutes)
router.use('/api/platilloDetalle', platilloDetalleRoutes)

module.exports = router