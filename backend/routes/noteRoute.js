import {createNote, deleteNote, getAllNoteByUser} from "../controllers/noteController.js"
import express from "express"
import {Auth} from '../middleware/authMiddleware.js'
const router = express.Router();

router.post('/add', Auth, createNote);
router.get('/', Auth, getAllNoteByUser);
router.delete('/delete/:noteId', Auth, deleteNote);


export default router;