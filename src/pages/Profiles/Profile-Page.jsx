import { useEffect, useState } from "react";
import UserLibrary from "../../components/UserLibrary/UserLibrary";
import * as profileService from '../../services/profileService'
import './Profile-Page.css'
const ProfilePage = (props) => {
  const [profile, setProfile] = useState()

  const handleRemoveBook = async(book) =>{
    console.log(book)
  }

  useEffect(() => {
    const profileData = async() =>{
      setProfile(props.profile)
    }
    if(!profile) profileData()
  }, [props.profile, profile])

  if (!profile) return <h1>Loading Profile</h1>
  else return ( 
  <>
  <div className="profilePic">
    <img src={`${profile.photo}`} alt='profile avatar'/>
  </div>

    <h1>{profile.name}</h1>
    {profile.library?<UserLibrary library={profile.library} handleRemoveBook={handleRemoveBook} />:<h2>No books in library</h2>}
  </>
  );
}

export default ProfilePage;