/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */

const fs = require("fs/promises"); // модуль функций
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json"); // путь к базе

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const listContacts = async () => {
  return await readData();
};

module.exports = listContacts;
