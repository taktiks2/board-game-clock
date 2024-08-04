import { useState, useEffect, useCallback } from "react";
import { Audio } from "expo-av";

interface Sounds {
  tiktak: Audio.Sound;
  beep: Audio.Sound;
  change: Audio.Sound;
}

export default function useAudio() {
  const [sounds, setSounds] = useState<Sounds | null>(null);

  const playSound = useCallback(
    async (name: keyof Sounds, mute = false) => {
      if (!sounds || mute) return;
      await sounds[name].replayAsync();
    },
    [sounds],
  );

  useEffect(() => {
    (async () => {
      const [tiktak, beep, change] = await Promise.all([
        await Audio.Sound.createAsync(require("@/assets/sounds/tiktak.mp3")),
        await Audio.Sound.createAsync(require("@/assets/sounds/beep.mp3")),
        await Audio.Sound.createAsync(require("@/assets/sounds/change.mp3")),
      ]);

      setSounds({
        tiktak: tiktak.sound,
        beep: beep.sound,
        change: change.sound,
      });
    })();

    return sounds
      ? () => {
          Object.values(sounds).forEach((sound) => sound.unloadAsync());
        }
      : undefined;
  }, []);

  return { playSound };
}
