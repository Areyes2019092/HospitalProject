import express from 'express'
import { createOption } from './option.controller.js'
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateFields } from '../../middlewares/validate-fields.js';

const router = express.Router();

router.post(
    '/options',
    [
        validateJWT,
        validateFields
    ], createOption
)

export default router;