/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable semi */
const fs = require("fs/promises"); // модуль функций
const path = require("path");
const crypto = require("crypto"); // генерирует айди
const chalk = require("chalk"); // цветные консоли
const contactsPath = path.join(__dirname, "contacts.json"); // путь к базе

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const newResult = contacts.filter(
    (contact) => contact.id !== (Number(contactId) || String(contactId))
  );
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newResult, null, 2) //обязательно приводим к строке
  );
  console.log("OLD", contacts.length);
  console.log("NEW", newResult.length);

  console.table(newResult);
  if (contacts.length === newResult.length) {
    console.log(
      chalk.yellow(` Contact with ${contactId}-ID not found in this list`)
    );
  } else {
    console.log(
      chalk.green(`Contact with ${contactId}-ID successfully deleted`)
    );
  }
};

module.exports = removeContact;
