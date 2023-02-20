const baseSearchURL = "https://openlibrary.org/search.json?q=";
export async function bookSearch(input){
  let newInput = input.query.replaceAll(' ', '+')
  console.log(`${baseSearchURL}${newInput}`)
  const res = await fetch(`${baseSearchURL}${newInput}`)
  return res.json()
}