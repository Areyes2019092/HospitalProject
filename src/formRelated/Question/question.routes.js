import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../../middlewares/validate-fields.js";
import { createQuestion, getQuestions } from "./question.controller.js";
import { questionNameExists } from "../../helpers/db-validators.js";

const router = Router();

router.post(
    "/",
    [
        check("questionName", "The question name is necessary").not().isEmpty(),
        check("questionName").custom(questionNameExists),
        validateFields
    ], createQuestion
);

router.get(
    "/:formId",
    [
        getQuestions
    ]
)



export default router;