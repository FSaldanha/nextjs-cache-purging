// import fs from 'fs'
import { promises } from 'fs'
// import { join } from 'path'
import LRUCache from 'lru-cache'

export async function purgePage(route) {
  try {
    // const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();*
    // const pagesDir = join(process.cwd(), ".next/serverless/pages/");
    /*const pagesDir = ".next/server/pages/";
    const fullPathHTML = `${pagesDir}${route}.html`;
    const fullPathJSON = `${pagesDir}${route}.json`;*/
    const pathname = `.next/server/pages/${route}`
    const fullPathHTML = `${pathname}.html`
    const fullPathJSON = `${pathname}.json`
    // await promises.unlink(fullPathHTML)
    // await promises.unlink(fullPathJSON)
    const cache = new LRUCache
    const teste = cache.itemCount.toString()
    // cache.del(fullPathHTML)
    // cache.del(fullPathJSON)
    return {
      // status: `${route} was sucessfully purged`
      status: teste
    }
  } catch (err) {
    return {
      status: `Could not purge ${route} - ${err}`
    }
  }
}

export async function getRandomAPI() {
  const res = await fetch('https://api.publicapis.org/random')
  const json = await res.json()
  return {
    name: json.entries[0].API,
    description: json.entries[0].Description,
  }
}

export function getCurrentDate() {
  let newDate = new Date()
  let day = String(newDate.getUTCDate()).padStart(2, "0")
  let month = String(newDate.getUTCMonth() + 1).padStart(2, "0")
  let year = newDate.getUTCFullYear()
  let hour = String(newDate.getUTCHours()).padStart(2, "0")
  let min = String(newDate.getUTCMinutes()).padStart(2, "0")
  let sec = String(newDate.getUTCSeconds()).padStart(2, "0")
  return `${year}-${month}-${day} ${hour}:${min}:${sec} UTC`
}