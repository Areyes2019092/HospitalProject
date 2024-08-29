
import { Router} from 'express';
import { check } from 'express-validator';
import { validateFields } from '../../middlewares/validate-fields.js';
import { createForm, getForms} from './form.controller.js';

const router = Router();

router.post(
    "/",
    [
        createForm 
    ]
)
router.get(
    "/",
    [
        validateFields
    ], getForms
)



export default router;