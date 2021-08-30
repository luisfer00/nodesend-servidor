import express from 'express'
import { check } from 'express-validator'

import { checkPasswordEnlace, nuevoEnlace, obtenerEnlace, todosEnlaces } from '../controllers/enlaces.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.post(
  '/',
  [
    check('nombre', 'Sube un archivo').not().isEmpty(),
    check('nombre_original', 'Sube un archivo').not().isEmpty(),
    auth,
  ],
  nuevoEnlace
)

router.get('/', todosEnlaces)

router.get('/:url', [obtenerEnlace])

router.post('/:enlace', checkPasswordEnlace)

export default router
