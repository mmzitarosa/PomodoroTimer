import {BREAK_TIME, WORK_TIME} from "@/constant";

export default class TimerService {

    private static instance: TimerService;

    private active: boolean;
    private workTime?: boolean;
    private nextAlarm?: number;
    private toNextAlarm?: number;
    private tomatoCounter: number;

    private constructor() {
        this.active = false;
        this.tomatoCounter = 0;
        this.reset();
    }

    static getInstance(): TimerService {
        if (!TimerService.instance)
            TimerService.instance = new TimerService();
        return this.instance;
    }

    public start(): void {
        if (this.workTime === undefined) {
            this.workTime = true;
            this.nextAlarm = new Date().getTime() + WORK_TIME;
            this.tomatoCounter++;
        } else if (this.toNextAlarm) {
            this.nextAlarm = new Date().getTime() + this.toNextAlarm;
        } else {
            return;
        }
        this.active = true;
    }

    public stop(): void {
        this.active = false;
    }

    public reset(): void {
        this.active = false;
        this.tomatoCounter = 0;
        this.workTime = undefined;
        this.nextAlarm = undefined;
        this.toNextAlarm = undefined;
    }

    public isActive(): boolean {
        return this.active;
    }

    public isWorkTime(): boolean {
        return this.workTime !== false;
    }

    public getTimeToNextAlarm(time: number): number {
        // Calculate difference
        this.calculateNextAlarm(time);

        // Check if the next alarm time is below 0
        this.checkTomato(time);

        // Get time to next alarm or default value
        return this.timeToNextAlarm();
    }

    public getTomatoCounter() {
        return this.tomatoCounter;
    }


    private calculateNextAlarm(time: number): number | undefined {
        if (this.nextAlarm && this.active) {
            this.toNextAlarm = TimerService.normalizeTime(this.nextAlarm - time);
        }
        return this.toNextAlarm;
    }

    private timeToNextAlarm(force?: boolean): number {
        if (this.toNextAlarm === undefined || force) {
            if (this.isWorkTime())
                this.toNextAlarm = WORK_TIME;
            else
                this.toNextAlarm = BREAK_TIME;
        }
        return this.toNextAlarm;
    }

    private checkTomato(time: number): void {
        if (this.toNextAlarm && this.toNextAlarm < 0) {
            this.stop();

            this.workTime = !this.workTime;

            // Get default value
            this.timeToNextAlarm(true)

            this.start();

            if (this.workTime)
                this.tomatoCounter++;
        }
    }

    private static normalizeTime(time: number): number {
        return Math.floor(time / 1000) * 1000;
    }

}
