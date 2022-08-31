const replace = require('replace-in-file');
require('dotenv').config();

const { API_URL, KINOPOISK_API_URL, KINOPOISK_API_KEY } = process.env;

const options = {
  files: './src/environments/environment.prod.ts',
  from: [/{API_URL}/g, /{KINOPOISK_API_URL}/g, /{KINOPOISK_API_KEY}/g],
  to: [API_URL, KINOPOISK_API_URL, KINOPOISK_API_KEY],
  allowEmptyPaths: false,
};

try {
  replace.sync(options);
  console.log('Build version set: ' + process.env);
} catch (error) {
  console.error('Error occurred:', error);
}
