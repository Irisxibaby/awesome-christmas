
import React, { useEffect, useRef } from 'react';

// Note: The user requested "EXO - First Snow". 
// Since we cannot host copyrighted files directly, we are using a royalty-free winter-themed track 
// ("We Wish You a Merry Christmas" by Kevin MacLeod) as a placeholder.
// To use the actual song, replace the MP3 source URL below with your hosted file of EXO - First Snow.
const MUSIC_MP3 = "/assets/music/first_snow.mp3";

interface BackgroundMusicProps {
  muted: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ muted }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    // Function to handle play attempt
    const attemptPlay = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log("Autoplay blocked. Waiting for user interaction.");
        // Fallback: Play on first interaction
        const handleInteraction = () => {
          audio.play().catch(e => console.error("Playback failed after interaction:", e));
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
      Your browser does not support the audio element.
    </audio>
  );
};
