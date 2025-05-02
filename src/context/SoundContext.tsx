import React, { createContext, useContext, useRef, useCallback } from 'react';

interface SoundContextType {
  play: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const selectorSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize sound on first interaction
  const initSound = useCallback(() => {
    if (!selectorSoundRef.current) {
      selectorSoundRef.current = new Audio('/sounds/selector1.mp3');
      selectorSoundRef.current.volume = 0.05;
    }
  }, []);

  // Play the selector sound
  const play = useCallback(() => {
    initSound();
    if (selectorSoundRef.current) {
      // Reset the current time to play from the beginning
      selectorSoundRef.current.currentTime = 0;
      // Play the sound
      selectorSoundRef.current.play().catch(e => console.log('Error playing sound', e));
    }
  }, [initSound]);

  return (
    <SoundContext.Provider value={{ play }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
}; 