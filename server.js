const { createServer } = require('http');
const next = require('next');
const { promises } = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const purgeData = async (pathname) => {
  const fullPathname = `.next/server/pages${pathname}`;
  const fullPathHTML = `${fullPathname}.html`;
  const fullPathJSON = `${fullPathname}.json`;
  try {
    await promises.unlink(fullPathHTML);
    await promises.unlink(fullPathJSON);
    const cachedData = await app.incrementalCache.get(pathname);
    const staleTime = new Date().getTime() - 1000;
    app.incrementalCache.set(pathname, {
      ...cachedData,
      revalidateAfter: staleTime
    }, 1);
    console.log(`Cache of ${fullPathname} was successfully purged`);
  } catch (err) {
    console.error(`Could not purge cache of ${fullPathname} - ${err}`);
  }
}

app.prepare().then(() => {
  createServer((req, res) => {
    const url = new URL(req.url, "http://localhost:3000/");
    if (url.searchParams.get('purge') == '1') {
      purgeData(url.pathname);
    }
    handle(req, res);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3000/`);
  })
})