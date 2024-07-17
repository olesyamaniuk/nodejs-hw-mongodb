import { ContactCollection } from '../db/models/contacts.js';
export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
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
