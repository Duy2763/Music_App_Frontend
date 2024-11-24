import { Audio } from 'expo-av';
import React, { createContext, useRef, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [commentIdCurrent, setCommentIdCurrent] = useState('');
  const [optionAddComment, setOptionAddComment] = useState('add-comment');
  const [songs, setSongs] = useState([]);
  const [userCurrent, setUserCurrent] = useState(null);
  const [playlist, setPlaylist] = useState([]); // Thêm trạng thái playlist
  const [currentIndex, setCurrentIndex] = useState(0); // Thêm trạng thái chỉ mục hiện tại
  const [isPlaying, setPlaying] = useState(false);
  const sound = useRef(new Audio.Sound());

  const playNextSong = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentSong(playlist[currentIndex + 1]);
    } else {
      setCurrentIndex(0);
      setCurrentSong(playlist[0]);
    }
  };

  const play = async () => {
    if (currentSong) {
      try {
        await sound.current.playAsync();
        setPlaying(true);
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  };

  const pause = async () => {
    if (currentSong) {
      try {
        await sound.current.pauseAsync();
        setPlaying(false);
      } catch (error) {
        console.error('Error pausing sound:', error);
      }
    }
  };

  const loadSound = async (song) => {
    try {
      await sound.current.unloadAsync();
      await sound.current.loadAsync({ uri: song.linkAudio });
      setCurrentSong(song);
      setPlaying(false);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        currentSong, 
        setCurrentSong, 
        currentTime, 
        setCurrentTime, 
        duration, 
        setDuration, 
        commentIdCurrent, 
        setCommentIdCurrent,
        optionAddComment,
        setOptionAddComment,
        songs,
        setSongs,
        userCurrent,
        setUserCurrent,
        playlist,
        setPlaylist,
        currentIndex,
        setCurrentIndex,
        playNextSong,
        play,
        pause,
        loadSound,
        isPlaying,
        setPlaying
      }}>
      {children}
    </AppContext.Provider>
  );
};