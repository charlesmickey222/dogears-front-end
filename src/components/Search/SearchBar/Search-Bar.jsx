
import { useState } from "react";
const SearchBar = (props) => {
  const [formData, setFormData] = useState({ query: '' })

  const handleChange = (evt) => {
    evt.preventDefault()
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }
  function handleSubmit(evt) {
    evt.preventDefault()
    props.handleBookSearch(formData)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name='query' type={'text'} autoCorrect='off' value={formData.query} onChange={handleChange} />
        <button type="submit">search</button>
      </form>
    </>
  );
}

export default SearchBar;