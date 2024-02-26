import express from 'express';
import postRouter from './routes/posts.routes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use(postRouter)
// app.use(cors())

export default app;