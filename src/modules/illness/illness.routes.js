import { check } from "express-validator";
import { Router } from "express";
import { validateFields } from "../../middlewares/validate-fields.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { illnessExists, urgencyLNExists } from "../../helpers/db-validators.js";
import { registerIllness, getAllIllness } from "./illness.controller.js";
const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("name", "Urgency Level is required").not().isEmpty(),
        check("name").custom(illnessExists),
        check("description", "Urgency Level is required").not().isEmpty(),
        validateFields
    ], registerIllness
);

router.get(
    "/",
    [
        validateJWT,
        validateFields
    ], getAllIllness
)

export default router;