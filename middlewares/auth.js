import jwt from 'jsonwebtoken'

const { verify } = jwt

const SECRET = process.env.SECRET

export const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    return next()
  }
  const token = authHeader.split(' ')[1]
  try {
    const usuario = verify(token, SECRET)
    req.usuario = usuario
    return next()
  } catch (e) {
    return res.status(404).json({ msj: 'Error al desencriptar el token' })
  }
}
