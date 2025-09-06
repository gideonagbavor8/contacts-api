const Contact = require('../models/contact');

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getSingleContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
};

module.exports = {getAllContacts, getSingleContact};
