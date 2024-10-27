import { Router } from 'express';
import { getTodos, getByID } from "../controller/artwork";
import { validarJWT, validarRol } from "../middlewares/validations";

const router = Router();

router.get("/", getTodos)
router.get("/:id", getByID)

export default router;
