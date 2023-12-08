import { EyeFilled, UserOutlined } from '@ant-design/icons'
import { Button, Input, Divider, Typography } from 'antd'

import './login.css'
import { useNavigate ,Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../gql/queries'
import { getToken } from '../config'

const Login = () => {
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [value, setValue] = useState('');
    const [error, setError] = useState('');


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
            throw new Error('Password must contain at least one special charector');  
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

    useEffect(() => {
        const token = localStorage.getItem("token")
            if(!token) getToken()
      }, []);

    const login = () => {
        if (emailValue !== "" && value !== ""){
            navigate("/")
        }else{
            setErrorMsg("Please enter email and password")
        }
          
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
                    placeholder="email" prefix={<UserOutlined />} />

            <Input size="large"
                    style={{
                        margin: "20px 0"
                    }}
                    type='text'
                    onChange= {handlePass}
                    value={value}
                    placeholder="password" prefix={<EyeFilled />} />  
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