import { useSelector } from 'react-redux'
import './player.css'
import { PlayCircleFilled, StepForwardFilled, StepBackwardFilled, RedoOutlined, RetweetOutlined, PauseCircleFilled, StepBackwardOutlined, FastBackwardOutlined, FastForwardOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';
import { useFetchWebAPI } from '../../hooks';
const Player = () => {
    const state = useSelector((state)=> state.spotify)
    const [currentTrack, setCurrentTrack] = useState([]);
   const [isPlaying, setIsPlaying] = useState(true);
    const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
 
 
  
console.log("soumya", state.playSingleSong)
const singleSong = state.playSingleSong
useEffect(() => {
  setCurrentTrack(prevArray => [
  ...prevArray, 
  singleSong[0]
  ]);
//   let newTrackList = [...prevArray];
// newTrackList.splice(2, 1, tracksData[0]);
// setCurrentTrack(newTrackList); 
 
}, [singleSong]);

    const currentSong = currentTrack[currentTrack.length-1]
    
    
   
    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
      };
      const progressBarRef = useRef();
      const audioRef = useRef();

      const playAnimationRef = useRef();

        const repeat = useCallback(() => {
            const currentTime = audioRef.current.currentTime;
            setTimeProgress(currentTime);
            progressBarRef.current.value = currentTime;
            progressBarRef.current.style.setProperty(
              '--range-progress',
              `${(progressBarRef.current.value / duration) * 100}%`
            );
        
            playAnimationRef.current = requestAnimationFrame(repeat);
        },  [audioRef, duration, progressBarRef, setTimeProgress]);

     useEffect(() => {
        if (!isPlaying) {
          audioRef.current.play();
          
        } else {
          audioRef.current.pause();
          
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
      }, [isPlaying, audioRef, repeat]);

      
      const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
      };

      const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
      };

      const formatTime = (time) => {
        if (time && !isNaN(time)) {
          const minutes = Math.floor(time / 60);
          const formatMinutes =
            minutes < 10 ? `0${minutes}` : `${minutes}`;
          const seconds = Math.floor(time % 60);
          const formatSeconds =
            seconds < 10 ? `0${seconds}` : `${seconds}`;
          return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
      };

      useEffect(() => {
        if (audioRef) {
          audioRef.current.volume = volume / 100;
          audioRef.current.muted = muteVolume;
        }
      }, [volume, audioRef, muteVolume]);

     
      const skipForward = () => {
        audioRef.current.currentTime += 5;
      };

      const skipBackward = () => {
        audioRef.current.currentTime -= 5;
      };
      
      const handlePrevious = () => {
        setTrackIndex(prev => prev-1)
      };
      
      const handleNext = () => {
       
        setTrackIndex(prev => prev+1)
      };

     
      
                  
    return (
       
      <div className="player-wrapper">
      <div className="player-song">
      <img src={currentSong?.album?.images[0]?.url} alt=""  className='player-song-img'/>
          <div className='player-song-discription'>
              <p className='player-song-name'>{currentSong?.name}</p>
              <p className='player-song-artists-name'>{currentSong?.artists[0]?.name}</p>
          </div>
      </div>
      <div className="player-container">
          <div className="player-controls">
              <button className='player-buttons'  onClick={handlePrevious}>
                  <StepBackwardFilled style={{
                      fontSize: 25,
                      color: "#888",
                      cursor: "pointer"
                  }} />
              </button>
              <button className='player-buttons'  onClick={skipBackward}>
                  <FastBackwardOutlined style={{
                      fontSize: 25,
                      color: "#888",
                      cursor: "pointer"

                  }} />
              </button>
              <button className='player-buttons' onClick={togglePlayPause}>
                  {isPlaying ? <PlayCircleFilled style={{
                      fontSize: 35,
                      color: "#888",
                      cursor: "pointer"

                  }} /> : <PauseCircleFilled style={{
                      fontSize: 35,
                      color: "#888",
                      cursor: "pointer"

                  }} />}
              </button>
              
              <button className='player-buttons'  onClick={skipForward}>
                  <FastForwardOutlined style={{
                      fontSize: 25,
                      color: "#888",
                      cursor: "pointer"

                  }} />
              </button>
              <button className='player-buttons'  onClick={handleNext}>
                  <StepForwardFilled style={{
                      fontSize: 25,
                      color: "#888",
                      cursor: "pointer"
                  }} />
              </button>
              
          </div>
          {/* <div className="player-track-container" data-start-value="0:13" data-end-value='4:09'>
              <div className="player-progress"></div>
          </div> */}
          <div>
          <audio src={currentSong?.preview_url} ref={audioRef} onLoadedMetadata={onLoadedMetadata}></audio>
          </div>
          <div className="progress">
              <span className="time current">{formatTime(timeProgress)}</span>
              <input type="range"
              ref={progressBarRef}
              defaultValue="0"
              onChange={handleProgressChange}
              />
              <span className="time">{formatTime(duration)}</span>
          </div>
      </div>
      <div className="controls-wrapper">
        <div className="controls">{/* ... */}</div>
        <div className="volume">
          <button>
          {muteVolume || volume < 5 ? (
              <IoMdVolumeOff />
            ) : volume < 40 ? (
              <IoMdVolumeLow />
            ) : (
              <IoMdVolumeHigh />
            )}
          </button>
          <input type="range" min={0} max={100} 
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
          />
        </div>
    </div>
      </div>
    )
}

export default Player