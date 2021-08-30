import express from 'express'

import { subirArchivo, eliminarArchivo, descargarArchivo} from '../controllers/files.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', auth, subirArchivo)
router.get('/:archivo', [descargarArchivo, eliminarArchivo])

export default router
