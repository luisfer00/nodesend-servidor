import mongoose from 'mongoose'
const { Schema } = mongoose

const enlacesSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  nombre_original: {
    type: String,
    required: true,
  },
  descargas: {
    type: Number,
    default: 1,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model('Enlaces', enlacesSchema)
