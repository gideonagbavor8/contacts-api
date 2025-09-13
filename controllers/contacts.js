const Contact = require('../models/contact');

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getSingleContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
};


const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    const savedContact = await newContact.save();
    res.status(201).json({ id: savedContact._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contact', error });
  }
};



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
    res.status(500).json({ message: 'Failed to update contact', error });
  }
};


const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact', error });
  }
};



module.exports = {getAllContacts, getSingleContact, createContact, updateContact, deleteContact};
