import { searchUser } from "../Services/LDAPService.js";

export const searchLdapUser = async (req, res, next) => {
  try {
    const { username } = req.query;
    const results = await searchUser(username);
    res.json(results);
  } catch (error) {
    next(error);
  }
};
