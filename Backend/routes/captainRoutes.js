import { request, response, Router } from "express";
import {getDoctorsById ,getAllDoctors } from "../controllers/captains.js";
import { login, register } from "../controllers/captainAuth.js";
import { verifyToken } from "../middlewares/auth.js";


const router = Router();

router.get("/", getAllDoctors);

router.get("/:id", getDoctorsById);


router.post("/register", register);

router.post("/login", login);

// router.put("/:id",  verifyToken, updateDoctor);

// router.delete("/:id",  verifyToken, deleteDoctor);


export default router;
