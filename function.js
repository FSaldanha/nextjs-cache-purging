const functions = require('firebase-functions');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: {
    experimental: {
      sprFlushToDisk: false,
    }
  },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = functions.https.onRequest(async (req, res) => {
  await server.prepare();
  const url = new URL(req.url, process.env.BASEURL);
  if (url.searchParams.get('purge') == '1') {
    res.set("Cache-Control", "s-maxage=0, no-cache, no-store, must-revalidate");
  }
  nextjsHandle(req, res);
})