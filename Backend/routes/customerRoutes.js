import { request, response, Router } from "express";
import { login, register } from "../controllers/customerAuth.js";
import { verifyToken } from "../middlewares/auth.js";
import {getPatientsById} from "../controllers/customers.js";

const router = Router();

// router.get("/", getAllPatients);

router.get("/:id", getPatientsById);

// router.get("/appointments/:patientId", getAppointmentById);

router.post("/register",register);

router.post("/login",login);

// router.put("/:id", verifyToken, updatePatient);

// router.delete("/:id", verifyToken, deletePatient);

// router.patch("/:id", updateAppointments);
export default router;
