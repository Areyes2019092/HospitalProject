import { Router } from "express";
import { check } from "express-validator"
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { userIdExist, userDPIExist, userIdNExist, userDPINExist} from "../../helpers/db-validators.js";
import { register } from "./user.controller.js";
import { validateFields } from "../../middlewares/validate-fields.js";
const router = Router();

router.post(
    "/register",
    [
        validateJWT,
        check("DPI", "DPI i required").not().isEmpty(),
        check("passportNumber"),
        check("name","Name is required").not().isEmpty(),
        check("lastName", "Last Name is required").not().isEmpty(),
        check("phone", "Phone is required").not().isEmpty(),
        validateFields
    ], register
);






export default router;