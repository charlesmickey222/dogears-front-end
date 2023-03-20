
import { Link} from "react-router-dom";

const UserLibrary = (props) => {
  
  const handleRemoveBook= async(evt)=>{ 
    try{
      props.handleRemoveBook(evt)
    }catch(err){
      console.log(err)
    }
}
  return ( 
  <section>
    {(props.library.bookCollection.length>0)?
    <>
      {props.library.bookCollection.map((book)=>
      <div key={book.title} className='book' book={book}> 
                <div onClick={handleRemoveBook} style={{'cursor':'pointer'}}>x</div>
                <Link to={`/books/${book.title.replaceAll(' ','-')}`} state={{book}}>{book.title}</Link>
                {book.authors?<h6>{book.authors[0]}</h6>:<h6>none found</h6>}
                <div className="coverContainer">
                <img className="cover" src={`${book.coverURL}`} alt="cover"/>
                </div>
      </div>)}
    </>
    :
    <h2>empty props.library</h2>
    }
  </section> 
  );
}

export default UserLibrary;