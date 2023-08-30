import { Link ,useNavigate} from "react-router-dom";
import "./login.css"
import { user as userDetails} from './dataDetails'
import axios from "axios"


const Login = ({user,setUser}) =>{


    const navigate = useNavigate()

    const onchange = (e,name) =>{  
        let val = e.target.value
  
        let userUpdated = user 
        userUpdated[name] = val 
        setUser({...userUpdated})
      }

    const onClickLogin = async () =>{
    
        let url = "http://localhost:4444/api/Auth/login"
    
        let sendData = { 
            "email":user.email, 
            "password":user.password
        }
    
        let result = await axios.post(url,sendData)
        .then((res)=>{ 
           return {type :"success",payload : res.data.token} 
        }).catch((err)=>{ 
            return {type :"error",payload : err}
        })
        console.log(result)
        if(result.type == "success"){
            let userData = userDetails()
        setUser(userData)
        sessionStorage.setItem("token",result.payload)
        navigate('/userInfo')
        }else{
            alert(result.payload.message)
        }
    }

    const onClickLoginWithGoogle = async ()=>{  
         
    }

    return(
        <div>
            <div className="login-box">
                <div className="login-fields">
                <div>
                        <label>user name</label>
                        <input type="text" value={user.email}  onChange={(e)=>{onchange(e,"email")}}/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" value={user.password} onChange={(e)=>{onchange(e,"password")}}/>
                    </div>
                    <div>
                        <button className="cursor-pointer" onClick={onClickLogin}>
                            log in
                        </button>
                    </div>
                
                </div>
                <div>
                    <div className="login-with-div">
                        <div className="login-with-line"></div>
                        <div className="login-with-text">login with</div>
                        <div className="login-with-line"></div>
                    </div>
                    <div className="login-apps-div"> 
                        <div className="login-app-text cursor-pointer" onClick={onClickLoginWithGoogle}>Google</div>
                    </div>
                </div>
                <div className="sign-up">
                    <Link to="/register">
                    <button className="cursor-pointer" >
                        sign up
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;