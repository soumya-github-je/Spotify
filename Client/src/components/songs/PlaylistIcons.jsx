// import React from 'react'
// import "./playlisticons.css"
// import { onClickPlaySongButton, onClickSavePlaylist } from '../../spotify/spotifySlice'
// import { useDispatch } from 'react-redux'
// import { EllipsisOutlined, HeartOutlined, PlayCircleFilled } from '@ant-design/icons'
// import { Tooltip } from 'react-tooltip'
// const PlaylistIcons = (playlistData) => {

//     const dispatch = useDispatch()
//     console.log("soumya data", playlistData)

//   return (
//     <div className="playlist-icons-container">
//                     <div className="playlist-play-icon">
//                         <PlayCircleFilled 
//                         onClick={()=> dispatch(onClickPlaySongButton(playlistData))}
//                         style={{
//                             fontSize: 55,
//                             color: "#1BD760"

//                             }}/>
                        
//                     </div>
                    
//                     <div>
//                         <a className="my-anchor-element1"><HeartOutlined  className="heart-oulined-icon"
//                         onClick={()=>dispatch(onClickSavePlaylist())}/></a>
//                         <Tooltip anchorSelect=".my-anchor-element1" place="top" tipPointerPosition="middle">
//                             Save to Your Library
//                         </Tooltip>   
//                     </div>
                    
//                     <div>
//                         <a className="my-anchor-element2"><EllipsisOutlined  className="elipises-outlined-icon"/></a>
//                         <Tooltip anchorSelect=".my-anchor-element2" place="top" tipPointerPosition="middle">
//                             More Options for Peaceful Piano
//                         </Tooltip> 
                        
//                     </div>
//                 </div>
//   )
// }

// export default PlaylistIcons