const fs = require('fs');
const path = require('path');

const serverUrl = process.env.SERVER_URL || 'http://localhost:3030';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

async function generate() {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  const data = 
  (await (await fetch(
    `${serverUrl}/content/sitemap`, opts)).json());
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset ' +
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9' +
    'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n' +
    '<url>\n' +
    `<loc>${clientUrl}/</loc>\n` +
    '<lastmod>2023-03-19T23:49:22+00:00</lastmod>\n' +
    '</url>\n' +
    '<url>\n' +
    `<loc>${clientUrl}/add-article</loc>\n` +
    '<lastmod>2023-03-19T23:49:22+00:00</lastmod>\n' +
    '</url>\n' +
    '<url>\n' +
    `<loc>${clientUrl}/subjects</loc>\n` +
    '<lastmod>2023-03-19T23:49:22+00:00</lastmod>\n' +
    '</url>\n' +
    '<url>\n' +
    `<loc>${clientUrl}/tags</loc>\n` +
    '<lastmod>2023-03-19T23:49:22+00:00</lastmod>\n' +
    '</url>\n' +
    '<url>\n' +
    `<loc>${clientUrl}/register</loc>\n` +
    '<lastmod>2023-03-19T23:49:22+00:00</lastmod>\n' +
    '</url>\n' +
    '<url>\n' +
    `<loc>${clientUrl}/login</loc>\n` +
    '<lastmod>2023-03-19T23:49:22+00:00</lastmod>\n' +
    '</url>\n' +
    '<url>\n' +
    `<loc>${clientUrl}/terms-of-use</loc>\n` +
    '<lastmod>2023-04-02T23:49:22+00:00</lastmod>\n' +
    '</url>\n' +
    '<url>\n' +
    `<loc>${clientUrl}/privacy-policy</loc>\n` +
    '<lastmod>2023-04-02T23:49:22+00:00</lastmod>\n' +
    '</url>\n' +
    `${data.articles.map(a => 
      '<url>\n' +
      `<loc>${clientUrl}/articles/${a._id}</loc>\n` +
      `<lastmod>${a.createTime}</lastmod>\n` +
      '</url>\n').join('')}` +
    `${data.subjects.map(s => 
      '<url>\n' +
      `<loc>${clientUrl}/subjects/${s._id}</loc>\n` +
      `<lastmod>${s.createTime}</lastmod>\n` +
      '</url>\n').join('')}` +
    `${data.tags.map(t => 
      '<url>\n' +
      `<loc>${clientUrl}/tags/${t._id}</loc>\n` +
      `<lastmod>${t.createTime}</lastmod>\n` +
      '</url>\n').join('')}` +
    `${data.users.map(u => 
      '<url>\n' +
      `<loc>${clientUrl}/users/${u._id}</loc>\n` +
      `<lastmod>${u.createTime}</lastmod>\n` +
      '</url>\n').join('')}` +
    '</urlset>';
  fs.writeFileSync(path.join(__dirname, './public/sitemap.xml'), xml);
}
generate();
