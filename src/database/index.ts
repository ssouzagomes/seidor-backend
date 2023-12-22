import fs from 'fs'
import path from 'path'

const filePath = path.resolve(__dirname, 'data.json');

const data = {
  cars: [],
  drivers: [],
  carUsage: []
};

const jsonData = JSON.stringify(data, null, 2); 

fs.writeFile(filePath, jsonData, (err) => {
  if (err) throw err;
  console.log('Schema successfully created!');
});