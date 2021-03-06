const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default class TimerService {

    private static instance: TimerService;

    private active: boolean;
    private workTime?: boolean;
    private nextAlarm?: number;
    private secondsToNextAlarm?: number;

    // private timer?: NodeJS.Timeout;

    private constructor() {
        this.active = false;
        this.reset();
    }

    static getInstance(): TimerService {
        if (!TimerService.instance)
            TimerService.instance = new TimerService();
        return this.instance;
    }

    public start(): void {
        this.active = true;

        if (this.workTime === undefined) {
            this.workTime = true;
            this.nextAlarm = TimerService.seconds() + WORK_TIME;
        } else if (this.secondsToNextAlarm) {
            this.nextAlarm = TimerService.seconds() + this.secondsToNextAlarm;
        } else {
            return;
        }

        // this.startService();
    }

    public stop(): void {
        this.active = false;
        // this.stopService();
    }

    public reset(): void {
        this.active = false;
        this.workTime = undefined;
        this.nextAlarm = undefined;
        this.secondsToNextAlarm = undefined;
    }

    public isActive(): boolean {
        return this.active;
    }

    public isWorkTime(): boolean {
        return this.workTime !== false;
    }

    public getTimeToNextAlarm(time: number): number | undefined {
        if (this.nextAlarm && this.isActive())
            this.secondsToNextAlarm = this.nextAlarm - TimerService.seconds(time);
        return this.secondsToNextAlarm;
    }

    //
    // private startService(): void {
    //     this.timer = setInterval(() => {
    //         if (this.nextAlarm)
    //             this.timeToNextAlarm = this.nextAlarm - new Date().getTime();
    //         else
    //             this.stopService();
    //         console.log("Tick: " + this.nextAlarm + " - " + new Date().getTime() + " = " + this.timeToNextAlarm);
    //
    //     }, 1000);
    // }

    // private stopService(): void {
    //     if (this.timer)
    //         clearInterval(this.timer);
    // }

    private static seconds(time?: number): number {
        if (!time)
            time = new Date().getTime();
        return Math.round(time / 1000);
    }

}
