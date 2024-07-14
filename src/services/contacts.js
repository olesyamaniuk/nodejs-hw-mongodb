import { ContactCollection } from "../db/models/contacts.js";
export const getAllContacts = async () => {
        const contacts = await ContactCollection.find();
        return contacts;
};
export const getContactsById = async (contactId) => {
    const contacts = await ContactCollection.findById(contactId);
    return contacts;
};
