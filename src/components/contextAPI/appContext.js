import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [commentIdCurrent, setCommentIdCurrent] = useState('');
  const [optionAddComment, setOptionAddComment] = useState('add-comment');
  const [songs, setSongs] = useState([]);
  const [userCurrent, setUserCurrent] = useState(null);

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
        setCommentIdCurrent ,
        optionAddComment,
        setOptionAddComment,
        songs,
        setSongs,
        userCurrent,
        setUserCurrent
      }}>
      {children}
    </AppContext.Provider>
  );
};