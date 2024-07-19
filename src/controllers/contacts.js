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
//GET
export const getAllContactsConroller = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder, type, isFavourite } = parseSortParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts ',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;

  const contact = await getContactsById(id);
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
  const data = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};
//PATCH
export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const data = await updateContact(id, req.body);
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
  const result = await deleteContact({ _id: id });
  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.status(204).send();
};
