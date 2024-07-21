import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getAllContactsConroller,
  getContactsByIdController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import isValid from '../middlewares/isValid.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsConroller));

router.get('/:id', isValid, ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:id',
  isValid,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete('/:id', isValid, ctrlWrapper(deleteContactController));

export default router;
