import { Router } from "express";
import { tokenAuthorization } from "../middleware/tokenAuthorization.js";
import { addJournalLeafs, deleteJournalLeafs, editJournalLeafs, getAllLeafs } from "../controllers/journalLeafs.js";
import multer from "multer";

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.get('/getLeafsinJournals',tokenAuthorization,getAllLeafs)
router.post('/addleafs',tokenAuthorization,upload.single('file'),addJournalLeafs)
router.post('/editleaf',tokenAuthorization,upload.single('file'),editJournalLeafs)
router.post('/deleteleaf',tokenAuthorization,deleteJournalLeafs)

export default router;