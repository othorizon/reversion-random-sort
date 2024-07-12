"use client";

import { Button } from "@/components/ui/button";
import { useRevData } from "@/hooks/store";
import { GithubIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ResultComp from "./components/result";
import RunningComp from "./components/running";
import StartComp from "./components/start";

async function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default function Home() {
  const revData = useRevData();
  const speedRef = useRef(revData.speed);
  const [play, setPlay] = useState(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    speedRef.current = revData.speed;
  }, [revData.speed]);

  const runWorker = async () => {
    while (true) {
      await sleep((11 - speedRef.current) * 100);
      if (revData.startTime < 1 || revData.endTime > 0) {
        break;
      }
      revData.shuffle();
    }
  };

  useEffect(() => {
    if (revData.startTime > 0) {
      runWorker();
    }
  }, [revData.startTime]);

  useEffect(() => {
    function autoPlay() {
      const _audio = new Audio("/ShadowsAndDust-chosic.com_.mp3");
      setAudio(_audio);
      _audio.play();
      window.removeEventListener("click", autoPlay);
    }
    window.addEventListener("click", autoPlay);
    return () => {
      window.removeEventListener("click", autoPlay);
    };
  }, []);

  const toggleSound = useCallback(() => {
    if (!audio) {
      return;
    }
    if (play) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlay((e) => !e);
  }, [audio, play]);

  return (
    <main className="w-screen h-screen flex  flex-col gap-20 items-center justify-start pt-24 px-16 lg:px-24">
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {!!audio && (
          <Button
            size="icon"
            className="opacity-15 hover:opacity-100 rounded-full h-8 w-8"
            onClick={toggleSound}
          >
            {play ? <Volume2Icon size="18" /> : <VolumeXIcon size="18" />}
          </Button>
        )}

        <Button
          size="icon"
          className="opacity-15 hover:opacity-100 rounded-full  h-8 w-8"
        >
          <a
            href="https://github.com/othorizon/reversion-random-sort"
            target="_blank"
          >
            <GithubIcon size="18" />
          </a>
        </Button>
      </div>

      <div className="w-full select-none text-4xl md:text-4xl lg:text-6xl flex justify-between font-extralight">
        <div className="md:mr-12">{"["}</div>
        {revData.curNumbers.map((e, idx) => (
          <div key={"n-" + idx} className="">
            {e.key}
          </div>
        ))}
        <div className="md:ml-12">{"]"}</div>
      </div>
      {revData.startTime < 1 && <StartComp />}
      {revData.startTime > 0 && revData.endTime < 1 && <RunningComp />}
      {revData.startTime > 0 && revData.endTime > 0 && <ResultComp />}
    </main>
  );
}
