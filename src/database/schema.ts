import fs from 'fs'
import path from 'path'

const fileName = process.env.NODE_ENV === 'test' ? 'data-test.json' : 'data.json'

const filePath = path.resolve(__dirname, fileName);

const data = {
  cars: [],
  drivers: [],
  carUsage: []
};

const jsonData = JSON.stringify(data, null, 2); 

fs.writeFileSync(filePath, jsonData);
console.log('Schema successfully created!');
