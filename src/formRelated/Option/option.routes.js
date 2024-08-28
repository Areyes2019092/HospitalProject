import express from 'express';
import { Router } from 'express';
import { validateFields } from '../../middlewares/validate-fields.js';
import { createOption, getOptions } from './option.controller.js';

const router = Router();

router.post(
    '/options',
    [
        validateFields
    ], createOption
)

router.get(
    "/:questionId",
    [
        getOptions
    ]
)

export default router;