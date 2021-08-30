import express from 'express'
import { check } from 'express-validator'
import { authUser, isUserAuth } from '../controllers/auth.js'

const router = express.Router()

router.post(
  '/',
  [
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password no puede ir vacio').not().isEmpty(),
  ],
  authUser
)

router.get('/', isUserAuth)

export default router
