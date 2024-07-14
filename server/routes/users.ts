import * as express from "express";
import { deleteUser, getUsers, updateUserStatus } from "../utils/userAction";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.post("/block", async (req, res) => {
  const { ids } = req.body;
  await updateUserStatus(ids, "blocked");
  res.json({ message: "User blocked!!" });
});

router.post("/unblock", async (req, res) => {
  const { ids } = req.body;
  await updateUserStatus(ids, "active");
  res.json({ message: "User unblocked!!" });
});

router.post("/delete", async (req, res) => {
  const { ids } = req.body;
  await deleteUser(ids);
  res.json({ message: "User deleted!!" });
});

export default router;
