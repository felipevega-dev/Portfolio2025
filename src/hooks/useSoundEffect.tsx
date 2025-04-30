import { useState, useCallback } from 'react';
import SoundEffect from '../components/SoundEffect';

const useSoundEffect = (soundUrl: string = '/sounds/selector1.mp3') => {
  const [playSound, setPlaySound] = useState(false);

  const play = useCallback(() => {
    setPlaySound(true);
    // Reset the trigger after a short delay
    setTimeout(() => setPlaySound(false), 100);
  }, []);

  // Return both the trigger function and a component that will play the sound
  return {
    play,
    SoundTrigger: () => <SoundEffect soundUrl={soundUrl} play={playSound} />
  };
};

export default useSoundEffect; 