"use client";

import { useRevData } from "@/hooks/store";
import { useCallback, useEffect, useRef, useState } from "react";
import RunningComp from "./components/running";
import StartComp from "./components/start";






async function sleep(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}


export default function Home() {
  const revData = useRevData();
  const speedRef = useRef(revData.speed);

  const runWorker = async () => {
    while (true) {
      await sleep((11 - speedRef.current) * 100);
      if (revData.endTime > 0) {
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



  return (
    <main className="w-screen flex min-h-screen flex-col gap-20 items-center justify-start p-24">
      <div className="text-xl md:text-4xl lg:text-6xl flex md:gap-4 lg:gap-6 font-extralight">
        <span className="">{"["}</span>
        {
          revData.curNumbers.map((e, idx) => (
            <>
              <span key={'n' + idx} className="">{e.key}</span>
              {idx !== revData.curNumbers.length - 1 && (
                <span key={'c' + idx} className="">{","}</span>
              )}
            </>
          ))
        }
        <span className="">{"]"}</span>
      </div>
      {revData.startTime < 1 && <StartComp />}
      {revData.startTime > 0 && <RunningComp />}

    </main>
  );
}
