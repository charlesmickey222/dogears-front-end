import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Book.css'
import * as olServices from'../../services/openLibraryService'
import * as profileService from '../../services/profileService'

const Book = (props) => {
  const navigate = useNavigate()
  const location = useLocation();
  const [book,setBook] = useState({})
  const [author,setAuthor] = useState({})
  const handleAddBookToLibrary = async(evt) =>{
    evt.preventDefault()
    if(location.state.book && location.state.user.profile){
    try {
      const newProfile = await profileService.addBookToProfileLibrary(location.state.user.profile, location.state.book)
      navigate(`/profiles/${newProfile.name.replaceAll(' ', '-')}`)
    } catch (error) {
      console.log(error)
    }
  }
  }
  useEffect(()=>{
    setBook(location.state.book)
  },[location])
  useEffect(()=>{
    const authorGrab = async() =>{
      const authorData = await olServices.fetchAuthor(`${book.author_key}`)
      setAuthor(authorData)
    }
    authorGrab()
  })
  return ( 
  <>
  <form>
    <button onClick={handleAddBookToLibrary}>add to library</button>
  </form>
  <h1>{book.title}</h1>
  <h3>{author.name}</h3>
  <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt='book cover' className="cover"/>
  </> );
}

export default Book;