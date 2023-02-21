import { useState } from "react";
import SearchBar from '../../components/Search/SearchBar/Search-Bar';
import * as olServices from '../../services/openLibraryService';
import './Search-Page.css'
const SearchPage = () => {
  const [searchData, setSearchData]= useState([])
  const [books, setBooks] = useState([])

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
              <div key={book.key} className='book'>
                {book.title}
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