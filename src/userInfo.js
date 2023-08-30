import { useEffect, useState } from "react"
import axios from "axios"
import "./login.css" 
import { Link, useNavigate } from "react-router-dom"
import { user as userDetails} from './dataDetails'

const UserInfo = () =>{


    const [user,setUser] = useState(userDetails())

  useEffect(()=>{
      getUserInfo()
  },[])

  const getUserInfo = async () =>{
    let url = "http://localhost:4444/api/Auth/userInfo"
 
    let token = sessionStorage.getItem("token")

    let result = await axios.get(url,{
        headers:{
            "access-token": token
        }
    })
    .then((res)=>{  
        return{type:"success",payload:res.data}
    }).catch((err)=>{ 
        return{type:"error",error:err.message}
    })
    console.log("result",result)
    if(result.type  == "success"){
        let userUpdated = user
        let gettedData = result.payload
        userUpdated.name = gettedData.name
        userUpdated.email = gettedData.email
        userUpdated.phone = gettedData.phone
        userUpdated.gender = gettedData.gender
        userUpdated.age = gettedData.age  
        setUser({...userUpdated})
    }else{
        alert(result.error)
    }
  }

    return(
        <div>
            <div className="user-box">
              <div className="user-fields">
                <div>
                    <label>name:</label> 
                    <label>{user.name}</label> 
                </div> 
                <div>
                    <label>email:</label> 
                    <label>{user.email}</label> 
                </div> 
                <div>
                    <label>phone:</label> 
                    <label>{user.phone}</label> 
                </div> 
                <div>
                    <label>age:</label> 
                    <label>{user.age}</label> 
                </div> 
                <div>
                    <label>gender:</label> 
                    <label>{user.gender}</label> 
                </div>                 
              </div>                 
            </div>
        </div>
    )
}

export default UserInfo;