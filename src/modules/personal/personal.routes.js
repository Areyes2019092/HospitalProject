import { Router } from "express";
import { check } from "express-validator"
import { validateJWT } from "../../middlewares/validate-jwt.js";
import {  userDPINExist, PersonalRoleNExists, personalDPINExist, urgencyLExists, urgencyLNExists } from "../../helpers/db-validators.js";
import { register, login, getAllUsers, getAllPersonalByRole} from "./personal.controller.js";
import { validateFields } from "../../middlewares/validate-fields.js";
const router = Router();

router.post(
    "/login",
    [
        check("DPI", "DPI is required").not().isEmpty(),
        check("DPI").custom(personalDPINExist),
        check("password", "Password is needed for login").not().isEmpty(),
        validateFields,
    ], login
)

router.post(
    "/register",
    [
        check("DPI"),
        check("passportNumber"),
        check("role", "Role must be one of them DOCTOR, PATIENT, NURSE or OTHER").isIn(["DOCTOR", "NURSE", "OTHER"]),
        validateFields
    ], register
);


router.get(
    "/get", 
    [
        validateJWT,
        validateFields
    ], getAllUsers
);



router.get(
    "/byRole", 
    [
        validateJWT,
        check("byRole","The role is required").not().isEmpty(),
        check("byRole").custom(PersonalRoleNExists),
        validateFields
    ], getAllPersonalByRole
);

export default router;