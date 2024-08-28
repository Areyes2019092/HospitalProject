import { Router} from 'express';
import { check } from 'express-validator';
import { validateFields } from '../../middlewares/validate-fields.js';
import { createForm, getForms, calculateResult } from './form.controller.js';

const router = Router();

router.post(
    "/calculate",
    [
        validateFields
    ], calculateResult
)

router.post(
    "/postForm",
    [
        validateFields
    ], createForm
)
router.get(
    "/getForm",
    [
        validateFields
    ], getForms
)



export default router;