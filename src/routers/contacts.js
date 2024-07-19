import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getAllContactsConroller,
  getContactsByIdController,
  updateContactController,
} from '../controllers/contacts.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import isValid from '../middlewares/isValid.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsConroller));

contactsRouter.get('/:id', isValid, ctrlWrapper(getContactsByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:id',
  isValid,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

contactsRouter.delete('/:id', isValid, ctrlWrapper(deleteContactController));

export default contactsRouter;
