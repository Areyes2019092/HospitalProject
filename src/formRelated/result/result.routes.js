import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../../middlewares/validate-fields.js";
import { calculateResult, getResult } from "./result.controller.js";

const router = Router();


router.get(
    "/",
    [
        validateFields
    ], getResult
)

router.post(
    "/",
    [
        validateFields
    ], calculateResult
)

export default router;