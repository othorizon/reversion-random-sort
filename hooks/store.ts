import { countSuccess } from "@/lib/utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface RevData {
    curNumbers: RevDataNum[];
    //开始时间
    startTime: number;
    endTime: number;
    //次数
    step: number;
    //速度
    speed: number;
    //最近100次历史
    historyNumbers: RevDataNum[][];
    max: {
        successNum: number;
        totalNum: number;
        step: number
        time: number
    };
    init: (start: boolean) => void;
    shuffle: () => void;
    updateStartTime: (time: number) => void;
    updateEndTime: (time: number) => void;
    updateSpeed: (speed: number) => void;
    removeOne: () => void;
}
export interface RevDataNum {
    key: number;
    index: number;
}


const STORAGE_KEY = "revesion-data-v1";
export const NUMBER_LENGTH = 9;
const MAX_HISTORY_LENGTH = 100;
export const useRevData = create<RevData, [["zustand/persist", RevData]]>(
    persist(
        (set, get) => ({
            ..._init(),
            init: (start: boolean) => set({
                ..._init(), ...(start ? { startTime: Date.now() } : null)
            }),
            shuffle: () => {
                if (get().startTime < 1 || get().endTime > 0) {
                    return;
                }
                const nums = [...get().curNumbers];
                const history = [...get().historyNumbers];
                _shuffle(nums);
                history.push(nums);
                if (history.length > MAX_HISTORY_LENGTH) {
                    history.shift();
                }
                const curStep = get().step + 1;
                const successCnt = countSuccess(nums);
                if (successCnt / nums.length > get().max.successNum / get().max.totalNum) {
                    set({
                        max: {
                            successNum: successCnt,
                            totalNum: nums.length,
                            step: curStep,
                            time: Date.now()
                        }
                    });
                }


                const isDone = successCnt == nums.length;
                if (isDone) {
                    set({ endTime: Date.now(), curNumbers: nums, historyNumbers: history, step: curStep })
                } else {
                    set({ curNumbers: nums, historyNumbers: history, step: curStep })
                }
            },
            updateStartTime: (startTime: number) => set({
                startTime
            }),
            updateEndTime: (endTime: number) => set({
                endTime
            }),
            updateSpeed: (speed: number) => set({
                speed: Math.max(0, Math.min(10, speed))
            }),
            removeOne: () => set({
                curNumbers: get().curNumbers.slice(1)
            })

        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),
        }
    )
);

function _shuffle(nums: RevDataNum[]) {
    for (let item of nums) {
        item.index = Math.random();
    }
    nums.sort((a, b) => (a.index - b.index))
}


function _init() {
    const nums: RevDataNum[] = [];
    for (let i = 1; i <= NUMBER_LENGTH; i++) {
        nums.push({
            key: i,
            index: i
        })
    }
    return {
        curNumbers: nums,
        startTime: -1,
        endTime: -1,
        step: 0,
        speed: 5,
        historyNumbers: [],
        max: {
            successNum: 0,
            totalNum: NUMBER_LENGTH,
            step: 0,
            time: 0
        },
    }
}