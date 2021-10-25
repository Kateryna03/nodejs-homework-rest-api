/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
const Joi = require("joi");
const fs = require("fs/promises"); // модуль функций
const path = require("path");
const crypto = require("crypto"); // генерирует айди
const chalk = require("chalk"); // цветные консоли
//const { addToContacts } = require("../../controllers/contactsControllers");
const contactsPath = path.join(__dirname, "contacts.json"); // путь к базе

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2) //обязательно приводим к строке
  );
  return newContact;
};

module.exports = addContact;
