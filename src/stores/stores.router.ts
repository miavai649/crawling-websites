import { Router } from "express";
import { GetAllPlan } from "./stores.controller";
const router = Router()

router.get('/', GetAllPlan)

export default router