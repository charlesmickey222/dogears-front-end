const baseSearchURL = "https://openlibrary.org/search.json?q=";
const baseAuthorURL = "https://openlibrary.org/authors/"
async function bookSearch(input){
  let newInput = input.query.replaceAll(' ', '+')
  console.log(`${baseSearchURL}${newInput}`)
  const res = await fetch(`${baseSearchURL}${newInput}`)
  return res.json()
}
async function fetchAuthor(authorKey){
  const res = await fetch(`${baseAuthorURL}${authorKey}.json`)
  return res.json()
}
export{
  bookSearch,
  fetchAuthor,
}