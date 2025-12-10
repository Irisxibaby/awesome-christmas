
import React, { useEffect, useRef } from 'react';

const MUSIC_MP3 = "/assets/music/first_snow.mp3";

interface BackgroundMusicProps {
  muted: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ muted }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // Set a reasonable background volume

    const attemptPlay = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log("Autoplay blocked. Waiting for user interaction.");
        
        const handleInteraction = () => {
          audio.play().catch(e => console.error("Playback failed after interaction:", e));
          // Remove listeners after first successful interaction trigger
          ['click', 'keydown', 'touchstart'].forEach(evt => 
            document.removeEventListener(evt, handleInteraction)
          );
        };
        
        ['click', 'keydown', 'touchstart'].forEach(evt => 
          document.addEventListener(evt, handleInteraction)
        );
      }
    };

    attemptPlay();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <audio 
      ref={audioRef} 
      loop 
      playsInline
      preload="auto"
      crossOrigin="anonymous"
    >
      <source src={MUSIC_MP3} type="audio/mpeg" />
    </audio>
  );
};

export default BackgroundMusic;
