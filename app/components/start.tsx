import { Button } from "@/components/ui/button";
import { useRevData } from "@/hooks/store";

export default function StartComp() {
    const revData = useRevData();
    const start = () => {
        revData.updateEndTime(-1);
        revData.updateStartTime(Date.now());
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="font-extralight text-base md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200 ">
                        <p>你拥有一组完美的数字</p>
                        <p>从一到九，这很完美</p>
                    </div>
                </div>
                <div>
                    <div className="font-extralight text-base md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200 ">
                        <div>你确定要打乱它吗？</div>
                    </div>
                </div>
                <Button size="lg" onClick={start}>
                    破坏！！！
                </Button>
            </div>
        </>
    )
}