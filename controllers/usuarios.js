import { hash } from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario.js'

const SECRET = process.env.SECRET

const { sign } = jwt

export const nuevoUsuario = async (req, res) => {
  try {
    const errores = validationResult(req)
    if (!errores.isEmpty())
      return res.status(400).json({ errores: errores.array() })

    const { email, nombre, password } = req.body
    if (!nombre.trim() || !email.trim() || !password.trim())
      return res.status(400).json({ msj: 'Rellena Todos los Campos' })
    if (await Usuario.findOne({ email: email }))
      return res.status(400).json({ msj: 'El Usuario ya esta Registrado' })

    const hashedPassword = await hash(password, 10)

    const usuario = new Usuario({ ...req.body, password: hashedPassword })
    await usuario.save()

    const token = sign({ id: usuario._id, nombre: usuario.nombre }, SECRET, {
      expiresIn: '8h',
    })

    res.json({ msj: 'Usuario Creado Correctamente', token })
  } catch (e) {
    res.status(500).json({ e })
  }
}
