import { Slider } from "@/components/ui/slider";
import { useRevData } from "@/hooks/store";

export default function RunningComp() {
    const revData = useRevData();

    return (
        <>
            <div>
                <div className="font-extralight text-base md:text-xl lg:text-4xl p-4  flex flex-col gap-4 items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl rounded-xl border bg-gray-200 ">
                    <p>它已不再完美</p>
                    <p>请等待它回归到原初</p>
                    <p>这需要时间，这是你的选择</p>
                </div>
                <Slider
                    value={[revData.speed]}
                    min={1}
                    max={10}
                    step={1}
                    className={"w-full"}
                    onValueChange={val => {
                        revData.updateSpeed(val[0])
                    }}
                />
            </div>
        </>
    )
}