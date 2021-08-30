import { compare } from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import Usuario from '../models/usuario.js'

const SECRET = process.env.SECRET

const { sign, verify } = jwt

export const authUser = async (req, res) => {
  const errores = validationResult(req)
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() })

  const { email, password } = req.body

  try {
    const usuario = await Usuario.findOne({ email })
    if (!usuario) return res.status(401).json({ msj: 'El usuario no existe' })
    if (!(await compare(password, usuario.password)))
      return res.status(401).json({ msj: 'Password Incorrecto' })

    const token = sign({ id: usuario._id, nombre: usuario.nombre }, SECRET, {
      expiresIn: '8h',
    })

    res.status(200).json({ token })
  } catch (e) {}
}

export const isUserAuth = async (req, res) => {
  const token = req.get('Authorization').split(' ')[1]
  if (!token) return res.status(404).json({ msj: 'No existe el token' })
  const usuario = verify(token, SECRET)
  res.status(200).json(usuario)
}
