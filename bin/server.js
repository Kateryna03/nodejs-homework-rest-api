/* eslint-disable semi */
/* eslint-disable quotes */
const mongoose = require("mongoose");
const app = require("../app");

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

// Подключаюсь к своей БД
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    })
  )
  .catch((error) => {
    console.log(error.mesage);
    process.exit(1);
  });

// mongoose
//   .connect(DB_HOST)
//   .then(() => app.listen(PORT))
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
