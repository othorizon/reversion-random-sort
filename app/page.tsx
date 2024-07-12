"use client";

import { useRevData } from "@/hooks/store";
import { useCallback, useEffect, useRef, useState } from "react";
import RunningComp from "./components/running";
import StartComp from "./components/start";
import ResultComp from "./components/result";
import { Button } from "@/components/ui/button";
import { PlayIcon, Volume2Icon, VolumeXIcon } from "lucide-react";






async function sleep(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

const audio = new Audio("/ShadowsAndDust-chosic.com_.mp3");
export default function Home() {
  const revData = useRevData();
  const speedRef = useRef(revData.speed);
  const [play, setPlay] = useState(true);

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
    speedRef.current = revData.speed;
  }, [revData.speed]);

  useEffect(() => {
    if (revData.startTime > 0) {
      runWorker();
    }

  }, [revData.startTime]);

  useEffect(() => {
    playSound();
  }, []);

  const playSound = () => {
    audio.play();
    setPlay(true);
  }
  const stopSound = () => {
    audio.pause();
    setPlay(false);
  }



  return (
    <main className="w-screen h-screen flex  flex-col gap-20 items-center justify-start p-24">
      <Button size="icon" className="opacity-15 hover:opacity-100 absolute right-4 top-4 rounded-full h-8 w-8" onClick={play ? stopSound : playSound}>
        {play ? (
          <Volume2Icon size="14" />
        ) : (
          <VolumeXIcon size="14" />
        )}

      </Button>
      <div className="w-full select-none text-4xl md:text-4xl lg:text-6xl flex justify-between font-extralight">
        <div className="md:mr-12">{"["}</div>
        {
          revData.curNumbers.map((e, idx) => (
            <div key={'n-' + idx} className="">{e.key}</div>
          ))
        }
        <div className="md:ml-12">{"]"}</div>
      </div>
      {revData.startTime < 1 && <StartComp />}
      {revData.startTime > 0 && revData.endTime < 1 && <RunningComp />}
      {revData.startTime > 0 && revData.endTime > 0 && <ResultComp />}

    </main>
  );
}
