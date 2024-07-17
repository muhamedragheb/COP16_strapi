const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');

// Your authentication token
const token = '7f867892ca5f9b3344f22a4bfa7d740568cafe7cd0950d1f6f100139b836cfe5e92a2a12c0bee8a7411e91aa9d11fae9a80a4b5cd930d48b521bf0c0ded85f4e9c367c1b8cb47931fcd36eb1c6ed99903bd4053f267ff453f7654127a39d3de75f275a08409edf1f4bc748b83573e116567653cb83f214f2a27bc1e6ab58ce50';
const csvFilePath = path.join(__dirname, 'countries.csv');

// Function to import data from CSV to Strapi
const importData = async (token) => {
  try {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        console.log('Read data:', data); // Log the read data for debugging
        results.push(data);
      })
      .on('end', async () => {
        for (const row of results) {
          console.log('Posting data:', row.Name); // Log the data being posted for debugging
          await axios.post('http://localhost:1337/api/nationalities', { data: { name: row.Name } }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        console.log('Data imported successfully!');
      });
  } catch (error) {
    console.error('Error importing data:', error.response ? error.response.data : error.message);
  }
};

// Execute the script
importData(token);
