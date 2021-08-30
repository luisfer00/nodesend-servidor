import { hash, compare } from 'bcrypt'
import { generate } from 'shortid'
import { validationResult } from 'express-validator'

import Enlace from '../models/enlace.js'

export const nuevoEnlace = async (req, res) => {
  const errores = validationResult(req)
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() })

  const { nombre_original, password, descargas, nombre } = req.body
  const enlace = new Enlace()

  enlace.url = generate()
  enlace.nombre = nombre
  enlace.nombre_original = nombre_original

  if (req.usuario) {
    if (password.trim()) enlace.password = await hash(password, 10)
    if (descargas) enlace.descargas = Number.parseInt(descargas)
    enlace.autor = req.usuario.id
  }

  try {
    await enlace.save()
    res.json({ msj: enlace.url })
  } catch (e) {}
}

export const obtenerEnlace = async (req, res, next) => {
  const enlace = await Enlace.findOne({ url: req.params.url })

  if (!enlace) return res.status(404).json({ msj: 'No se encuentra el enlace' })

  res.json({ archivo: enlace.nombre, password: enlace.password ? true : false })
  return next()
}

export const todosEnlaces = async (req, res) => {
  try {
    const enlaces = await Enlace.find({}).select('url -_id')
    res.status(200).json(enlaces)
  } catch (e) {}
}

export const checkPasswordEnlace = async (req, res) => {
  const { password } = req.body
  const { enlace } = req.params

  try {
    const { password: passwordEnlace } = await Enlace.findOne({
      url: enlace,
    }).select('password -_id')
    if (!passwordEnlace)
      return res.status(404).json({ msj: 'El archivo no existe' })
    const passwordsMatch = await compare(password, passwordEnlace)
    if (!passwordsMatch)
      return res.status(401).json({ msj: 'La clave no coincide' })
    return res.status(200).json({ password: passwordsMatch })
  } catch (e) {}
}
