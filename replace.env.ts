const replace = require('replace-in-file');
require('dotenv').config();

const { API_URL, KINOPOISK_API_URL, KINOPOISK_API_KEY, NODE_ENV } = process.env;

const isProd = NODE_ENV === 'production';

const options = {
  files: isProd
    ? './src/environments/environment.prod.ts'
    : './src/environments/environment.ts',
  from: [/{API_URL}/g, /{KINOPOISK_API_URL}/g, /{KINOPOISK_API_KEY}/g],
  to: [API_URL, KINOPOISK_API_URL, KINOPOISK_API_KEY],
  allowEmptyPaths: false,
};

try {
  replace.sync(options);
  console.log(
    'Build version set: ' +
      JSON.stringify({
        API_URL,
        KINOPOISK_API_URL,
        KINOPOISK_API_KEY,
        NODE_ENV,
      })
  );
} catch (error) {
  console.error('Error occurred:', error);
}
