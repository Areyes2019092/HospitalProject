
import { Router} from 'express';
import { check } from 'express-validator';
import { validateFields } from '../../middlewares/validate-fields.js';
import { createForm, getForms} from './form.controller.js';

const router = Router();


router.post(
    "/postForm",
    [
        createForm 
    ]
)
router.get(
    "/getForm",
    [
        validateFields
    ], getForms
)



export default router;