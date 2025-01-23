import { Router } from "express";
import { tokenAuthorization } from "../middleware/tokenAuthorization.js";
import { addJournalLeafs, deleteJournalLeafs, editJournalLeafs, getAllLeafs } from "../controllers/journalLeafs.js";

const router = Router()

router.get('/getLeafsinJournals',tokenAuthorization,getAllLeafs)
router.post('/addleafs',tokenAuthorization,addJournalLeafs)
router.post('/editleaf',editJournalLeafs)
router.post('/deleteleaf',deleteJournalLeafs)

export default router;