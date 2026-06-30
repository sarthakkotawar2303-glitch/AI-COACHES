const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

/**
 * @name connectDb
 * @description Establishes a connection to the MongoDB database.
 * @returns {void}
 * @throws {Error} If the database connection fails.
 * 
 */
const connectDb = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected`);
   } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
   }
};

module.exports = connectDb;
