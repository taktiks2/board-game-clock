import { useState, useEffect, useCallback, useRef } from "react";
import { useAudioPlayer } from "expo-audio";
import { SoundName } from "@/components/PlayerTimer";

export function useSound(isAudioOn: boolean) {
  const [mute, setMute] = useState(!isAudioOn);

  const tiktak = useAudioPlayer(require("@/assets/sounds/tiktak.mp3"));
  const beep = useAudioPlayer(require("@/assets/sounds/beep.mp3"));
  const change = useAudioPlayer(require("@/assets/sounds/change.mp3"));

  const soundsRef = useRef({ tiktak, beep, change });
  soundsRef.current = { tiktak, beep, change };

  const playSound = useCallback(
    (name: SoundName) => {
      if (mute) return;
      const player = soundsRef.current[name];
      player.seekTo(0);
      player.play();
    },
    [mute],
  );

  useEffect(() => {
    setMute(!isAudioOn);
  }, [isAudioOn]);

  return { playSound, mute, setMute };
}
