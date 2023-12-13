import { EyeFilled, EyeInvisibleFilled, UserOutlined } from '@ant-design/icons'
import { Button, Input, Divider, Typography } from 'antd'

import './login.css'
import { useNavigate ,Link} from 'react-router-dom'

import { getToken } from '../config'
import { useState } from 'react'

const Login = () => {
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(false)


    const validatePassword = (password) => {
        const minLength = 8;

        if (password.length < minLength) {
          throw new Error('Password must be at least 8 characters');  
        }
        
        if (!password.match(/[A-Z]/)) {
            throw new Error('Password must contain at least one uppercase letter');  
          }
          if (!password.match(/[a-z]/)) {
            throw new Error('Password must contain at least one lowercase letter');  
          }
        // 
        if (!password.match(/[!-*]/)) {
            throw new Error('Password must contain at least one special character');  
          }
          if (!password.match(/[0-9]/)) {
            throw new Error('Password must contain at least one number');  
          }
       }

 
    // const [logintoAccount] = useLazyQuery(LOGIN)
    
    const handleEmail = (e) => {
        const { value } = e.target
        setEmailValue(value)
        
    }
    const handlePass = (e) => {
        const { value } = e.target;
        setValue(value);
        try {
            validatePassword(value);  
            setError('');
        } catch (err) {
            setError(err.message);
        }
        
    }

    // const login = async () => {
    //     // Get the token first
    //     await getToken();
   
    //     // Then navigate after the token has been retrieved
    //     navigate("/") 
    // }

    
    const login = async () => {
        await getToken()
        const token = localStorage.getItem("token")
        if(token){
            navigate("/")
        }
    }
    
    const isCheckedhandle = () => {
        setIsChecked(!isChecked)
    }
     
    
    return(
      <div className="login-container">
        <div className="login-wrapper">
            <h1>Login to Spotify</h1>
            <Input size="large"
                    style={{
                        margin: "20px 0"
                    }}
                    type='text'
                    onChange= {handleEmail}
                    value={emailValue}
                    placeholder="username" prefix={<UserOutlined />} />

            {isChecked ? <Input size="large"
                    style={{
                        margin: "20px 0"
                    }}
                    type='text'
                    onChange= {handlePass}
                    value={value}
                    placeholder="password" prefix={<EyeFilled  onClick={isCheckedhandle}/>} />  
                    : <Input size="large"
                    style={{
                        margin: "20px 0"
                    }}
                    type='password'
                    onChange= {handlePass}
                    value={value}
                    placeholder="password" prefix={<EyeInvisibleFilled onClick={isCheckedhandle}/>} />  
                
                }



                    {error && <p className="error-msg">{error}</p>}
                    <Button
                            onClick={login}
                        >
                            Login
                </Button>
                        
                <p className='error-msg'>{errorMsg}</p>

                {/* <Divider style={{
                    background: "#aaa"
                }} />
                <Typography.Paragraph
                    style={{
                        color: "#fff"
                    }}
                >
                    Not yet register <Link to="/register">
                        Register here
                    </Link>
                </Typography.Paragraph> */}

            
        </div>
      </div>
 )
      
}

export default Login