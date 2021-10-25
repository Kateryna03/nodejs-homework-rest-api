/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */
const fs = require("fs/promises"); // модуль функций
const path = require("path");
const crypto = require("crypto"); // генерирует айди
const chalk = require("chalk"); // цветные консоли
const contactsPath = path.join(__dirname, "../../db/contacts.json"); // путь к базе

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const updateContact = async (id, data) => {
  const contacts = await readData();
  const idx = contacts.find((contact) => contact.id.toString() === id);
  // const idx = contacts.findIndex(
  //   (item) => item.id === (Number(id) || String(id))
  // );
  if (idx === -1) {
    return null;
  }

  const updatedContact = {
    ...idx,
    ...data,
  };

  const updated = contacts.map((contact) => {
    if (contact.id.toString() === id) {
      return updatedContact;
    } else return contact;
  });
  console.log("IDX", contacts[idx]);

  await fs.writeFile(
    contactsPath,
    JSON.stringify(updated, null, 2) //обязательно приводим к строке
  );
  return updatedContact;
};

module.exports = updateContact;
