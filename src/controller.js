import knex from './knex.js';
import { getChaptersUrls, getChaptersBody } from './utils.js';

const getNovels = (request, response) => {
  knex('novels').select('*').then((data) => {
    response.json(data);
  }).catch((error) => {
    console.error(error);
  });
};

const addNovel = (request, response) => {
  const { name, urls, summary, genre } = request.body;
  knex('novels').insert({
    name,
    urls,
    summary,
    genre,
    created_at: new Date(),
    updated_at: new Date()
  }).then(() => {
    response.json({ message: 'Novel added.' });
  }).catch((error) => {
    console.error(error);
  });
};

const updateNovel = (request, response) => {
  const { id } = request.params;
  const { name, urls, summary, genre } = request.body;
  knex('novels').where({ id }).update({
    name,
    urls,
    summary,
    genre,
    updated_at: new Date()
  }).then(() => {
    response.json({ message: 'Novel updated.' });
  }).catch((error) => {
    console.error(error);
  });
};

const deleteNovel = (request, response) => {
  const { id } = request.params;
  knex('novels').where({ id }).del().then(() => {
    response.json({ message: 'Novel deleted.' });
  }).catch((error) => {
    console.error(error);
  });
};

const getChapters = (request, response) => {
  knex('chapters').select('*').then((data) => {
    response.json(data);
  }).catch((error) => {
    console.error(error);
  });
};

const scanChapters = async (request, response) => {
  const { novel_id } = request.body;
  const url = await knex('novels').where({ id: novel_id }).select('urls').first();
  const chaptersUrls = await getChaptersUrls(url.urls);
  chaptersUrls.forEach(async (chapterUrl) => {
    const body = await getChaptersBody(chapterUrl);
    const chapters = {
      novel_id,
      url: chapterUrl,
      body,
      created_at: new Date(),
      updated_at: new Date()
    };
    // Insert chapters into database if not exists
    const exists = await knex('chapters').where({ url: chapterUrl }).select('id').first();
    if (!exists) {
      await knex('chapters').insert(chapters);
    }
  });

  response.json(chapters);
};

export default {
  getNovels,
  addNovel,
  updateNovel,
  deleteNovel,

  getChapters,
  scanChapters
};