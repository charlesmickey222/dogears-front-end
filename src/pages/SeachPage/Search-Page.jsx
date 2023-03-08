import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from '../../components/Search/SearchBar/Search-Bar';
import * as olServices from '../../services/openLibraryService';

import './Search-Page.css'
const SearchPage = (props) => {
  const [searchData, setSearchData]= useState([])
  const [books, setBooks] = useState([])
  const user = props.user
  async function handleBookSearch(formData){
    const searchResults = await olServices.bookSearch(formData)
    setSearchData(searchResults)
    setBooks(searchResults.docs)
  }
  return (
    <>
      <SearchBar handleBookSearch={handleBookSearch}/>
      <div className="searchResultsContainer">
        {books.length ? books.map(book =>
              <div key={book.key} className='book' book={book}>
                <Link to={`/books/${book.title.replaceAll(' ','-')}`} state={{book,user}}>{book.title}</Link>
                {book.author_name?<h6>{book.author_name}</h6>:<h6>none found</h6>}
                <div className="coverContainer">
                <img className="cover" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt="cover"/>
                </div>
              </div>
              )

          :
          <h1>Search A Book</h1>
        }
      </div>
    </>
  );
}

export default SearchPage;