import multer from 'multer'
import { generate } from 'shortid'
import { unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import Enlace from '../models/enlace.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const subirArchivo = async (req, res) => {
  const upload = multer({
    limits: {
      fileSize: req.usuario ? Math.pow(1024, 2) * 5 : Math.pow(1024, 2),
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '/../uploads')
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.split('.')
          ? `.${file.originalname.split('.').pop()}`
          : ''
        const fullname = `${generate()}${extension}`
        cb(null, fullname)
      },
    }),
  }).single('archivo')

  upload(req, res, async error => {
    if (error) {
      return res.status(500).json({ msj: error.message })
    }
    res.json({ filename: req.file.filename })
  })
}

export const eliminarArchivo = async (req, res) => {
  if (!req.archivo) return
  try {
    await unlink(`${__dirname}/../uploads/${req.archivo}`)
  } catch (e) {}
}

export const descargarArchivo = async (req, res, next) => {
  try {
    const enlace = await Enlace.findOne({ nombre: req.params.archivo })
    if (!enlace) return res.status(404).send('Archivo no encontrado')
    const fullPath = `${__dirname}/../uploads/${req.params.archivo}`

    if (enlace.descargas === 1) {
      req.archivo = enlace.nombre
      await Enlace.findByIdAndRemove(enlace._id)
    } else if (enlace.descargas > 1) {
      enlace.descargas--
      await enlace.save()
    }
    res.download(fullPath, err => {
      next()
    })
  } catch (e) {}
}
