import { useEffect, useRef } from 'react';

interface SoundEffectProps {
  soundUrl: string;
  play: boolean;
}

const SoundEffect = ({ soundUrl, play }: SoundEffectProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(soundUrl);
    audioRef.current.volume = 0.05; // Set volume to 20%
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundUrl]);

  useEffect(() => {
    if (play && audioRef.current) {
      // Reset the audio to start if it was playing
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        // Silent catch for browsers that block autoplay
        console.log('Audio play failed:', error);
      });
    }
  }, [play]);

  return null; // This component doesn't render anything
};

export default SoundEffect; 