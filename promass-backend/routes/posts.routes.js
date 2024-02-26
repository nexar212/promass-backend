import { Router } from 'express'
import { getPosts, getOnePost, createPost } from '../controllers/post.controllers.js'
import cors from 'cors';

const router = Router()

router.get('/posts', cors() ,getPosts)

router.get('/posts/:id', cors(), getOnePost)

router.post('/posts', cors(), createPost)

export default router;