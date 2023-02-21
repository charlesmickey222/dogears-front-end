import { useEffect, useState } from "react";
import * as profileService from '../../services/profileService'
import './Profile-Page.css'
const ProfilePage = (props) => {
  const [profile,setProfile]= useState({})

  useEffect(() => {
    const profileData = async() =>{
      const target = await profileService.fetchProfile(props.user.profile)
      setProfile(target)
    }
    profileData()
  }, [props.user])
  if (!profile) return <h1>Loading Profile</h1>
  else return ( 
  <>
  <div className="profilePic">
    <img src={`${profile.photo}`} alt='profile avatar'/>
  </div>
    
    <h1>{profile.name}</h1>
  </>
  );
}

export default ProfilePage;