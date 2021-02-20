const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { default: next } = require('next');
const os = require('os')
// const { promises } = require('fs')

admin.initializeApp();

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: { distDir: `${os.tmpdir()}/.next` },
});

const purgeData = async (pathname, server) => {
  const fullPathname = `${os.tmpdir()}/.next/server/pages${pathname}`
  // const fullPathHTML = `${fullPathname}.html`
  // const fullPathJSON = `${fullPathname}.json`
  const bucket = admin.storage().bucket();
  const fullPathHTML = `${fullPathname}.html`
  const fullPathJSON = `${fullPathname}.json`
  try {
    await bucket.file(fullPathHTML).delete();
    await bucket.file(fullPathJSON).delete();
    const cachedData = await server.incrementalCache.get(pathname);
    const staleTime = new Date().getTime() - 1000
    server.incrementalCache.set(pathname, {
      ...cachedData,
      revalidateAfter: staleTime
    }, 1)
    functions.logger.log(`Cache of ${fullPathname} was successfully purged`);
  } catch (err) {
    functions.logger.error(`Could not purge cache of ${fullPathname} - ${err}`);
  }
}

/*const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => {
    const url = new URL(req.url, process.env.BASEURL)
    if (url.searchParams.get('purge') == '1') {
      purgeData(url.pathname);
    }
    nextjsHandle(req, res)
  })
})*/

const nextjsHandle = server.getRequestHandler();
exports.nextServer = functions.https.onRequest(async (req, res) => {
  await server.prepare();
  const url = new URL(req.url, process.env.BASEURL);
  if (url.searchParams.get('purge') == '1') {
    purgeData(url.pathname, server);
  }
  nextjsHandle(req, res);
})