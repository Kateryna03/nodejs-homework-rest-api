/* eslint-disable semi */
/* eslint-disable quotes */

const fs = require("fs/promises"); // модуль функций
const path = require("path");
const contactsPath = path.join(__dirname, "../../db/contacts.json"); // путь к базе
const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === String(contactId) // привожу к строке - чтоб можно было найти по любому айди
  );
  return result;
};

module.exports = getContactById;
