import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <AppContext.Provider value={{ currentSong, setCurrentSong, currentTime, setCurrentTime, duration, setDuration }}>
      {children}
    </AppContext.Provider>
  );
};