import { ContactCollection } from '../db/models/contacts.js';
import { SORT_ORDER } from '../constant/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  type = null,
  isFavourite = null,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  let contactsQuery = ContactCollection.find();
  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  if (type !== null) {
    contactsQuery = contactsQuery.where('contactType').equals(type);
  }

  if (isFavourite !== null) {
    contactsQuery = contactsQuery.where('isFavourite').equals(isFavourite);
  }
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactsById = (id) => ContactCollection.findById(id);

export const createContact = (payload) => ContactCollection.create(payload);

export const deleteContact = (contactId) =>
  ContactCollection.findOneAndDelete(contactId);

export const updateContact = async (contactId, payload, options = {}) => {
  const contact = await ContactCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    payload,
    { ...options },
  );
  return contact;
};
