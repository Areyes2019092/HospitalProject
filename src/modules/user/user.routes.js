import { Router } from "express";
import { check } from "express-validator"
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { userIdExist, userDPIExist, userIdNExist, userDPINExist } from "../../helpers/db-validators.js";
import { register, getAllUsers, login } from "./user.controller.js";
import { validateFields } from "../../middlewares/validate-fields.js";
const router = Router();

router.post(
    "/login",
    [
        check("DPI", "DPI is required").not().isEmpty(),
        check("DPI").custom(userDPINExist),
        check("password", "Password is needed for login").not().isEmpty(),
        validateFields,
    ], login
)

router.post(
    "/register",
    [
        check("DPI", "DPI i required").not().isEmpty(),
        check("passportNumber"),
        check("name","Name is required").not().isEmpty(),
        check("lastName", "Last Name is required").not().isEmpty(),
        check("phone", "Phone is required").not().isEmpty(),
        check("password", "password is required").not().isEmpty(),
        check("role", "Role must be one of them DOCTOR, PATIENT, NURSE or OTHER").isIn(["DOCTOR", "NURSE", "PATIENT", "OTHER"]),
        validateFields
    ], register
);

router.get(
    "/", 
    [
        validateJWT,
        validateFields
    ], getAllUsers
);

export default router;