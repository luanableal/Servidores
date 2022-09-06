import { Router } from "express";
import { listar, cadastrar, deletar, atualizar} from "../controllers/controller.js"
const router = Router();

router.get("/usuarios", listar);
router.post("/usuarios", cadastrar);
router.delete("/usuarios/:id", deletar);
router.put("/usuarios/:id", atualizar);


export default router;