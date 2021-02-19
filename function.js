require('dotenv').config();

const { https } = require('firebase-functions');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest(async (req, res) => {
  await server.prepare();
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.indexOf('/isg') !== -1) {
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
    res.setHeader("x-test", "forcing header here");
  }
  nextjsHandle(req, res);
});