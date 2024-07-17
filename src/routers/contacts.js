import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getAllContactsConroller,
  getContactsByIdController,
  updateContactController,
} from '../controllers/contacts.js';
import isValid from '../middlewares/isValid.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsConroller));

contactsRouter.get('/:id', isValid, ctrlWrapper(getContactsByIdController));

contactsRouter.post('/', ctrlWrapper(createContactController));

contactsRouter.patch('/:id', isValid, ctrlWrapper(updateContactController));

contactsRouter.delete('/:id', isValid, ctrlWrapper(deleteContactController));

export default contactsRouter;
