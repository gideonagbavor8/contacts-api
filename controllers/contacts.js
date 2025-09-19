const Contact = require('../models/contact');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contacts', error: error.message });
  }
};

// GET single contact by ID
const getSingleContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contact', error: error.message });
  }
};

// POST create new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    const savedContact = await newContact.save();

    res.status(201).json({ id: savedContact._id });
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', error: error.message });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedData = req.body;

    const result = await Contact.findByIdAndUpdate(contactId, updatedData, {
      new: true,
      runValidators: true
    });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact updated successfully.' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update contact', error: error.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact', error: error.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
