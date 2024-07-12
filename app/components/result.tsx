import { Button } from "@/components/ui/button";
import { NUMBER_LENGTH, useRevData } from "@/hooks/store";
import { formatDate, timeDifference } from "@/lib/utils"

export default function ResultComp() {
    const revData = useRevData();
    const removeCount = NUMBER_LENGTH - revData.curNumbers.length;
    const diff = timeDifference(revData.endTime, revData.startTime);
    return (
        <>
            <div>
                <div className="font-extralight text-base md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200 ">
                    <p>{formatDate(new Date(revData.endTime), 'yyyy-MM-dd HH:mm:ss')}，在这一刻</p>
                    <p>历经 {diff.days} 天 {diff.seconds} 秒</p>
                    <p>迭代了 {revData.step} 次</p>
                    {removeCount > 0 && (
                        <>
                            <p>并放弃了 {removeCount} 个之后</p>
                            <p>它回归了原初的秩序</p>
                            <p>虽然，它并不完美了</p>
                            <p>这是你的选择</p>
                        </>
                    )}
                    {removeCount < 1 && (
                        <>
                            <p>你一个没有放弃</p>
                            <p>一直在坚持并且等待着</p>
                            <p>它最终回归了完美的样子</p>
                            <p>这是真的吗？</p>
                            <p>你确定？？</p>
                        </>
                    )}
                </div>
                <div className="mt-4 w-full flex justify-center">
                    <Button onClick={() => revData.init(false)}>
                        REVERSION
                    </Button>
                </div>
            </div>
            <div className="absolute w-screen px-4 flex justify-between top-2 text-6xl text-zinc-50 select-none">
                {"REVERSION".split("").map((e, idx) => (
                    <div key={idx}>{e}</div>
                ))}
            </div>
        </>
    )
}