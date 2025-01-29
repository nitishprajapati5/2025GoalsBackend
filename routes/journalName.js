import e, { Router } from "express";
import { tokenAuthorization } from "../middleware/tokenAuthorization.js";
import { addJournal, deleteJournal, editJournalName, getAllJournal } from "../controllers/journalName.js";

const router = Router()

router.get("/getAllJournal",tokenAuthorization,getAllJournal)
router.post('/addJournal',tokenAuthorization,addJournal)
router.put('/editjournalName',tokenAuthorization,editJournalName)
router.post('/deletejournal',tokenAuthorization,deleteJournal)


export default router;