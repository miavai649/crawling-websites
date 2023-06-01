import { Router } from "express";
import { DeleteEndPoint, GetAllEndPoint, GetEndPoint, UpdateEndPoint } from "./endpoint.controller";
const router = Router()

router.post('/', GetEndPoint)
router.get('/', GetAllEndPoint)
router.put('/:id', UpdateEndPoint)
router.delete('/:id', DeleteEndPoint)

export default router