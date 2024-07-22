import { ContactCollection } from '../db/models/contacts.js';
import { SORT_ORDER } from '../constant/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({
  page ,
  perPage ,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  let contactsQuery = ContactCollection.find({ userId });

  if (filter.isFavorite) {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};
// export const getContactsById = async (contactId, userId) => {
//   return await ContactCollection.findOne({ _id: contactId, userId });
// };
export const getContactsById = (contactId) => ContactCollection.findById(contactId);

export const createContact = (payload) => ContactCollection.create(payload);

export const deleteContact = (contactId) =>
  ContactCollection.findOneAndDelete(contactId);

// export const deleteContact = (contactId) => ContactCollection.findOneAndDelete(contactId);

export const updateContact = async (contactId, payload = {}, userId) => {
  const updateOptions = { new: true, includeResultMetadata: true };

  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    updateOptions,
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upsert),
  };
};
