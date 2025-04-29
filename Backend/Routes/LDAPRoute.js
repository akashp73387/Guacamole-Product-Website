import express from "express";
import { searchLdapUser } from "../Controllers/LDAPController.js";

const router = express.Router();

router.get("/search", searchLdapUser);

export default router;
