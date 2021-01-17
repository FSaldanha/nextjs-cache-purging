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
  let day = String(newDate.getUTCDate()).padStart(2, "0");
  let month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
  let year = newDate.getUTCFullYear();
  let hour = String(newDate.getUTCHours()).padStart(2, "0");
  let min = String(newDate.getUTCMinutes()).padStart(2, "0");
  let sec = String(newDate.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${min}:${sec} UTC`
}