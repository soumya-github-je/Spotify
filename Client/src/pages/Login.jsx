import { EyeFilled, UserOutlined } from '@ant-design/icons'
import { Button, Input, Divider, Typography } from 'antd'
import './login.css'
import { useNavigate ,Link} from 'react-router-dom'
import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../gql/queries'


const Login = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        email: '',
        password: ""
    })

    const [logintoAccount] = useLazyQuery(LOGIN)
    
    const handleEmail = (e) => {
        const { value } = e.target
        setFormValues((prev) => ({
            ...prev,
            email: value
        }))
    }
    const handlePass = (e) => {
        const { value } = e.target
        setFormValues((prev) => ({
            ...prev,
            password: value
        }))
    }

const login =  async () => {
    if (formValues.email != "" && formValues.email != null){
        const token = await logintoAccount({
           
            variables: {
                email: formValues.email,
                password: formValues.password
            }
        })
        if (!token.error){
            localStorage.setItem("token" , token.data.login.token)
            navigate('/')
        }
        alert(token.error.message)
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
                    value={formValues.email}
                    placeholder="email" prefix={<UserOutlined />} />

            <Input size="large"
                    style={{
                        margin: "20px 0"
                    }}
                    type='password'
                    onChange= {handlePass}
                    value={formValues.password}
                    placeholder="password" prefix={<EyeFilled />} />        
                <Button
                    onClick={login}
                >
                    Login
                </Button>

                <Divider style={{
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
                </Typography.Paragraph>

            
        </div>
      </div>
 )
      
}

export default Login