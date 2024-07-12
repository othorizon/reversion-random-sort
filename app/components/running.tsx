import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useRevData } from "@/hooks/store";
import { formatDate } from "@/lib/utils";

export default function RunningComp() {
    const revData = useRevData();


    return (
        <>
            <div>
                <div className="font-extralight text-base md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200 ">
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
                {revData.step > 100 && (
                    <div className="mt-4 w-full flex justify-center">
                        <Button onClick={() => revData.removeOne()}>
                            放弃一个
                        </Button>
                    </div>
                )}
            </div>
            <div className="absolute w-screen px-4 flex justify-between top-2 text-6xl text-zinc-50 select-none">
                {"REVERSION".split("").map((e, idx) => (
                    <div key={idx}>{e}</div>
                ))}
            </div>

        </>
    )
}