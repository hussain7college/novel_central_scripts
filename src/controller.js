import knex from './knex.js';
import { getChaptersUrls, getChaptersContent } from './utils.js';

const getNovels = (request, response) => {
  knex('novels').select('*').then((data) => {
    response.json(data);
  }).catch((error) => {
    console.error(error);
  });
};

const addNovel = (request, response) => {
  const { name, url, summary, genre } = request.body;
  knex('novels').insert({
    name,
    url,
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
  const novel = await knex('novels').where({ id: novel_id }).select('url').first();
  const chapters = await getChaptersUrls(novel.url);
  const chaptersKeys = Object.keys(chapters);
  let x = 0;
  console.log('✅', chapters);
  for (let i = 0; i < chaptersKeys.length; i++) {
    const chapterKey = chaptersKeys[i];
    const chapterPage = await getChaptersContent(chapters[chapterKey].url);
    const chapter = {
      novel_id,
      url: chapters[chapterKey].url,
      number: i + 1,
      name: chapters[chapterKey].name,
      content: chapterPage.content,
      created_at: new Date(),
      updated_at: new Date()
    };
    // Insert chapters into database if not exists
    const exists = await knex('chapters').where({ url: chapters[chapterKey].url }).select('id').first();
    if (!exists) {
      await knex('chapters').insert(chapter);
    }
    x++;
    if (x === chaptersKeys.length) {
      response.json({ message: 'Chapters added.' });
    }
  }

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