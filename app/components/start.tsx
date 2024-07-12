import { Button } from "@/components/ui/button";
import { useRevData } from "@/hooks/store";
import { useState } from "react";

export default function StartComp() {
    const [confirm, setConirm] = useState(0);
    const revData = useRevData();
    const start = () => {
        if (confirm < 1) {
            setConirm(1);
            return;
        }
        revData.init(true);
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="font-extralight text-base md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200">
                        <p>你拥有一组完美的数字</p>
                        <p>从一到九，这很完美</p>
                    </div>
                </div>
                <div>
                    <div className="font-extralight text-base md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200">
                        <div>你确定要打乱它吗？</div>
                    </div>
                </div>
                {confirm > 0 && (
                    <div>
                        <div className="font-extralight text-base md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200">
                            <div>这真的再也无法回去</div>
                            <div>希望你想好了</div>
                        </div>
                    </div>
                )}
                <Button size="lg" onClick={start}>
                    破坏！！！{confirm > 0 ? "！！！" : ""}
                </Button>
            </div>
        </>
    )
}