import express from 'express';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateFields } from '../../middlewares/validate-fields.js';

const router = express.Router();

router.post(
    '/options',
    [
        validateJWT,
        validateFields
    ]
)

export default router;