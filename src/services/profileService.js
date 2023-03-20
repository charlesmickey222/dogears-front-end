import * as tokenService from './tokenService'
import * as olService from './openLibraryService'
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function addPhoto(photoData, profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoData
  })
  return await res.json()
}

async function fetchProfile(profileID){
  const res = await fetch(`${BASE_URL}/${profileID}`, {
    headers:{
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  return await res.json()
}

async function addBookToProfileLibrary(profileId, book,coverURL){
  try {
    let pages = '';
    const bookAsWork = await olService.fetchWorkData(book.key)
    console.log(bookAsWork)
    const bookData = new FormData()

    if(book.contributions) {
      const contributionsString = book.contributions.join('+')
      bookData.append('contributions', contributionsString)
    }
    if(bookAsWork){
      bookData.append('description', `${bookAsWork.description}`)
      }else{
      bookData.append('description', 'none found')
      }
    bookData.append('coverURL', `${coverURL}`)
    book.number_of_pages_median?pages = book.number_of_pages_median: pages = 0;
    bookData.append('publishDate',`${book.first_publish_year}`)
    bookData.append('olID', `${book.key}`)
    bookData.append('title',`${book.title}`)
    bookData.append('authors', `${book.author_name}`)
    bookData.append('publishers', `${book.publisher}`)
    bookData.append('subjects', `${book.subject}`)
    bookData.append('subjectPlaces', `${book.place}`)
    bookData.append('subjectPeople', `${book.people}`)
    bookData.append('pages', pages)
    const res = await fetch(`${BASE_URL}/${profileId}/library`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: bookData
    })
    return await res.json()
} catch (error) {
  throw new Error(error)
}
}

async function removeBookFromLibrary(bookID, profileID){
  try {
    const delData = new FormData()
    delData.append('bookId')
    const res = await fetch(`${BASE_URL}/${profileID}`,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: bookID
    })
    return await res.json()
  } catch (error) {
    throw new Error(error)
  }
}

export { getAllProfiles, addPhoto, fetchProfile, addBookToProfileLibrary, removeBookFromLibrary }
