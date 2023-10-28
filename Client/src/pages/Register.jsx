import { EyeFilled, UserOutlined } from '@ant-design/icons'
import { Button, Input, Divider, Typography } from 'antd'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { REGISTER } from '../gql/queries'


const Register = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        email: '',
        password: "",
        userName: ""
    })

    const [RegisterToAccount] = useLazyQuery(REGISTER)
    

    const handleUserName = (e) => {
        const {value} = e.target 
        setFormValues((prev) => ({
            ...prev,
            userName: value
        }))
    }
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

const register =  async () => {
    if (formValues.email != "" && formValues.email != null){
        console.log("loding...");
        const token = await RegisterToAccount({
           
            variables: {
                ...formValues
            }
        })
        console.log("token" , token)

        if (!token.error){
            localStorage.setItem("token" , token.data.register.token)
            navigate('/')
        }
        alert(token.error.message)
    }
}


    return(
      <div className="login-container">
        <div className="login-wrapper">
            <h1>Register to Spotify</h1>
            <Input size="large"
                    style={{
                        margin: "20px 0"
                    }}
                    type='text'
                    onChange= {handleUserName}
                    value={formValues.userName}
                    placeholder="username" prefix={<UserOutlined />} />        

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
                    onClick={register}
                >
                    Register
                </Button>
            
        </div>
      </div>
 )
      
}

export default Register