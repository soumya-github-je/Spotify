import { Outlet, useNavigate } from "react-router-dom";
import {LeftOutlined, RightOutlined, PlayCircleFilled, SearchOutlined, LogoutOutlined} from "@ant-design/icons"
import { useState, useEffect, useRef } from "react";
import Footer from "./global/Footer"
import { useSelector, useDispatch } from "react-redux";
import "./main.css"
import { onChangeSearchInput } from "../spotify/spotifySlice";
import Popup from 'reactjs-popup'

const Main = () => {
    const [show ,setShow] = useState({
        opacity: 0
    })
    const mainRef = useRef("")
    const [title, setTitle] = useState('')
    const [bgColor , setBgColor] = useState({
        background: "#090909"
    })
    const navigate = useNavigate()
    const state = useSelector((state)=> state.spotify)

    
    const dispatch = useDispatch()

    const onChange = e => {
        dispatch(onChangeSearchInput(e.target.value));
      }

    useEffect(()=> {
        const handleReachedEvent = (event) => {
            setShow({
                opacity: 1
            })
            setBgColor({
                background :"#1a1a17"
            })
            setTitle(event.detail)
        }
        const handleRemovedEvent = () => {
            setTitle('')
            setShow({
                opacity: 0
            })
            setBgColor({
                background: "#121212cc"
            })
            
        }

        window.addEventListener("reached_top", handleReachedEvent)
        window.addEventListener("removed_top", handleRemovedEvent)

        return () => {
            window.removeEventListener("reached_top", handleReachedEvent)
            window.removeEventListener("removed_top", handleRemovedEvent)
        }
    } , [])

    console.log("main", mainRef.current)

    const onClickLogoutButton = () => {
       localStorage.removeItem("token")
       navigate("/login")
    }

    return(
        <div className="main" ref={mainRef}>
            <div className="main-top" style={{
                ...bgColor,
                marginLeft: "auto",
                
            }}>
                <div className="navigation-arrows">
                    <div className="left-arrow" onClick={()=> navigate(-1)}><LeftOutlined/></div>
                    <div className="right-arrow" onClick={()=> navigate(1)}><RightOutlined/></div>
                </div>
                
                {state.isSearchActive && <div className="search-input-icon-container">
                    <div className="search-icon-container">
                    <SearchOutlined className="search-icon"/>
                        </div>
                    
                    <input type="search" className="search-input" value={state.searchInput} onChange={onChange} placeholder="What do you want to listen to?"/>
                    </div>}
                
                <div className="buttons-container">
                    
                  
                    {/* <button className="log-in-button">Log out</button> */}
                    <div className="popup-container">
                                        <Popup
                                            modal
                                            trigger={
                                                <div>
                                                    <button type="button" className="log-in-button">
                                                        <LogoutOutlined className="logout-icon"/>
                                                        <p className="logout-text">Log out</p>
                                                    </button>
                                                </div>
                                            
                                            }
                                        >
                                            {close => (
                                            <>  
                                            <div className="pop-up-bg-container">
                                                <div>
                                                    <p className="pop-up-text">Are you sure! You want to Logout?</p>
                                                    </div>
                                                    <div>
                                                        <button
                                                        type="button"
                                                        className="popop-up-button"
                                                        onClick={() => close()}
                                                        >
                                                        Close
                                                        </button>
                                                        
                                                            <button type="button" className="popop-up-button" onClick={onClickLogoutButton}>
                                                                Confirm
                                                            </button>
                                                        
                                                        
                                                    </div>
                                            </div>
                                            </>
                                            )}
                                        </Popup>

                    </div>
                </div>
            </div>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Main