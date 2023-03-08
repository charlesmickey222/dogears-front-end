
const UserLibrary = (props) => {


  return ( 
  <section>
    {(props.library.length>0)?<></>:<h2>empty library</h2>}
  </section> 
  );
}

export default UserLibrary;