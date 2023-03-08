import * as tokenService from './tokenService'

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

async function addBookToProfileLibrary(profileId, book){
  const res = await fetch(`${BASE_URL}/${profileId}/library/${book.isbn[0]}`,{
    method:'POST',
    headers:{
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body:book,
  })
}

export { getAllProfiles, addPhoto, fetchProfile,addBookToProfileLibrary }
