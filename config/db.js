import mongoose from 'mongoose'

export default async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: process.env.MONGODB_DBNAME,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWD,
    })
    console.log(`Connected to MongoDB at ${process.env.MONGODB_URI}`)
  } catch (e) {
    console.log("Couldn't connect to MongoDB")
    console.error(e)
    process.exit(1)
  }
}
