import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { NUMBER_LENGTH, useRevData } from "@/hooks/store";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { RunningChart } from "./running-chart";
import { Badge } from "@/components/ui/badge";

export default function RunningComp() {
    const revData = useRevData();
    const [allowRemove, setAllowRemove] = useState(false);

    useEffect(() => {
        setAllowRemove(checkAllowRemove(revData.curNumbers.length, revData.step));
    }, [revData.curNumbers, revData.step]);


    return (
        <>
            <div className="absolute w-screen px-4 flex justify-between top-2 text-6xl text-zinc-50 select-none">
                {"REVERSION".split("").map((e, idx) => (
                    <div key={idx}>{e}</div>
                ))}
            </div>

            <div className="select-none z-30">
                <div className="flex justify-center mb-5 text-center">
                    <Badge variant="default">
                        {`${formatDate(new Date(revData.max.time))} 时，你最接近成功,在迭代了${revData.max.step}次后，有 ${revData.max.successNum}/${revData.max.totalNum} 个已经回归`}
                    </Badge>
                </div>
                <div className="font-extralight text-sm  md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200 ">
                    <p>{formatDate(new Date(revData.startTime), 'yyyy-MM-dd HH:mm:ss')}，在这一刻</p>
                    <p>它已不再完美</p>
                    <p>请等待它回归到原初</p>
                    <p>这需要时间，这是你的选择</p>
                </div>
                <Slider
                    value={[revData.speed]}
                    min={1}
                    max={10}
                    step={1}
                    className={"w-full -translate-y-2"}
                    onValueChange={val => {
                        revData.updateSpeed(val[0])
                    }}
                />

                {revData.step > 230 && (
                    <div className="mt-4 w-full flex justify-center">
                        <Button disabled={!allowRemove} onClick={() => revData.removeOne()} className="select-none">
                            {allowRemove ? "放弃一个" : "放弃总是容易的，再坚持一下吧"}

                        </Button>
                    </div>
                )}
            </div>
            <div className="absolute bottom-5 w-full left-0 z-0">
                <RunningChart />
            </div>
        </>
    )
}

function checkAllowRemove(len: number, step: number) {
    return step > Math.pow(2.3, (NUMBER_LENGTH - len + 1)) * 100;

}