import mongoose from 'mongoose'
const { Schema } = mongoose

const usuariosSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
})

export default mongoose.model('Usuarios', usuariosSchema)
