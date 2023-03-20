const baseSearchURL = "https://openlibrary.org/search.json?q=";
const baseAuthorURL = "https://openlibrary.org/authors/"
const baseURL = "https://openlibrary.org"
async function bookSearch(input){
  let newInput = input.query.replaceAll(' ', '+')
  const res = await fetch(`${baseSearchURL}${newInput}`)
  return await res.json()
}
async function fetchAuthor(authorKey){
  try{
    const res = await fetch(`${baseAuthorURL}${authorKey}.json`)
    return await res.json()
  }catch (error) {
    console.log(error)
  }
}
async function fetchWorkData(key){
  try {
    const res = await fetch(`${baseURL}${key}.json`)
    return await res.json()
  } catch (error) {
    console.log(error)
  }

}
export{
  bookSearch,
  fetchAuthor,
  fetchWorkData,
}