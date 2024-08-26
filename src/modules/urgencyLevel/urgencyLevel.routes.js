import { check } from "express-validator";
import { Router } from "express";
import { validateFields } from "../../middlewares/validate-fields.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { urgencyLExists } from "../../helpers/db-validators.js"; 
import { registerUrgencyLevel, getCategories } from "./urgencyLevel.controller.js";
const router = Router();

router.post(
    "/create",
    [
        validateJWT,
        check("name", "Urgency Level is required").not().isEmpty(),
        check("name").custom(urgencyLExists),
        validateFields
    ], registerUrgencyLevel
);

router.get(
    "/get",
    [
        validateJWT,
        validateFields
    ],getCategories
)

export default router;