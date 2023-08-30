import axios from "axios"
import "./login.css" 
import { Link, useNavigate } from "react-router-dom"
import { user as userDetails} from './dataDetails'

const Register = ({user,setUser}) =>{ 

    const navigate = useNavigate()

    const onchange = (e,name) =>{  
      let val = e.target.value

      let userUpdated = user
      if(name == "gender"){        
        userUpdated[name] = e.target.id
      }else{
        userUpdated[name] = val 
      }
      setUser({...userUpdated})
    }

const onRegister = async () => {
    
    let url = "http://localhost:4444/api/Auth/register"

    let sendData = {
        "name":user.name,
        "email":user.email,
        "phone":user.phone,
        "age":user.age ? Number(user.age) : 0,
        "gender":user.gender,
        "password":user.password
    }

    let result = await axios.post(url,sendData)
    .then((res)=>{
        alert("register successfuly")
        let userData = userDetails()
        setUser(userData)
        navigate('/login')
    }).catch((err)=>{
        alert(err.response.data)
    })

}

    return(
        <div>
            <div className="login-box">
              <div className="login-fields">
              <div>
                    <label>full name</label>
                    <input type="text" value={user.name}  onChange={(e)=>{onchange(e,"name")}}/>
                </div>
                <div>
                    <label>email</label>
                    <input type="text"  value={user.email} onChange={(e)=>{onchange(e,"email")}}/>
                </div>
                <div>
                    <label>password</label>
                    <input type="text"  value={user.password} onChange={(e)=>{onchange(e,"password")}}/>
                </div>
                <div>
                    <label>phone numer</label>
                    <input type="numer"  value={user.phone} onChange={(e)=>{onchange(e,"phone")}}/>
                </div>
                <div>
                    <label>age</label>
                    <input type="number"  value={user.age} onChange={(e)=>{onchange(e,"age")}}/>
                </div>
                <div className="gender-div">
                    <div className="radio-div"> 
                <input type="radio" id="male" name="gender"  checked={user.gender == "male"?  true : false} onChange={(e)=>{onchange(e,"gender")}}/>
                    <label htmlFor="male">male</label>
                    </div>
                    <div className="radio-div">
                <input type="radio" id="female" name="gender" checked={user.gender == "female"?  true : false} onChange={(e)=>{onchange(e,"gender")}}/>
                    <label htmlFor="female">female</label>
                    </div>
                </div>
                <div >
                    <button style={{cursor:"pointer"}}  onClick={onRegister}>
                        Register
                    </button>
                </div>
              </div> 
              <div className="sign-up"> 
                    <Link to="/login">
                    <button className="cursor-pointer" >
                        log in
                    </button>
                    </Link>
                </div>                
            </div>
        </div>
    )
}

export default Register;