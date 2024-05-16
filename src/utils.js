// websites supported: riwyat.org

import { JSDOM } from 'jsdom';

async function getChaptersUrls(url) {
  // returning: {
  // 1: {name: 'Chapter 1', url: 'https://example.com/chapter-1'},
  // 2: {name: 'Chapter 2', url: 'https://example.com/chapter-2'},
  // ...}

  const response = await fetch(url);
  const html = await response.text();

  // Parsing HTML string into a DOM document
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Define an empty object to store chapter data
  var chapters = {};

  // Select all list items with class wp-manga-chapter
  var chapterItems = document.querySelectorAll('.wp-manga-chapter');

  // Loop through each list item
  chapterItems.forEach(function (item) {
    // Get chapter URL and name
    var chapterUrl = item.querySelector('a').getAttribute('href');
    var chapterName = item.querySelector('a').textContent.trim();

    // Extract chapter number from chapter name
    var chapterNumberMatch = chapterName.match(/الفصل (\d+)/); // Assuming chapter name format is consistent
    if (chapterNumberMatch) {
      var chapterNumber = parseInt(chapterNumberMatch[1]);

      // Store chapter data in the chapters object
      chapters[chapterNumber] = {
        name: chapterName,
        url: chapterUrl
      };
    }
  });

  return chapters;
}


async function getChaptersContent(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Parsing HTML string into a DOM document
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Finding the first element with class .novel-body
    const novelBodyElement = document.querySelector('.reading-content');

    if (novelBodyElement) {
      // Storing innerHTML in an object
      const data = {
        url: url,
        content: novelBodyElement.innerHTML
      };

      return data;
    } else {
      console.error('No element with class .reading-content found in the fetched HTML.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching or extracting data:', error);
    return null;
  }
}


export { getChaptersUrls, getChaptersContent };