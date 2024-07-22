import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
//GET
export const getAllContactsConroller = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts ',
    data: contacts.data.length ? contacts : { data: [] },
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const contact = await getContactsById(id, userId);
  if (!contact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
      data: { message: 'Contact not found' },
    });
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

//POST
export const createContactController = async (req, res) => {
  const contactData = {
    ...req.body,
    userId: req.user._id,
  };

  const contact = await createContact(contactData, req);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};
//PATCH
export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const data = await updateContact(id, req.body, userId);
  if (!data) {
    throw createHttpError(404, 'There is no such contact, unfortunately');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

//DELETE
export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const result = await deleteContact(id, userId );
  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  // res.status(204).send();
  res.status(204).json({

    message: 'Successfully deleted!'
  });
};
