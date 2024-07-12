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
                const isDone = checkDone(nums);
                if (isDone) {
                    set({ endTime: Date.now(), curNumbers: nums, historyNumbers: history, step: get().step + 1 })
                } else {
                    set({ curNumbers: nums, historyNumbers: history, step: get().step + 1 })
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

function checkDone(curNumbers: RevDataNum[]) {
    const x = [...curNumbers].sort((a, b) => (a.key - b.key));
    const y = [...curNumbers].sort((a, b) => (a.index - b.index));
    const exist = x.find((e, idx) => e.key !== y[idx].key);
    return !exist;
}

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
    }
}