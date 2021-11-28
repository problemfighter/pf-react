

export class PFDateTimeUtil {

    public leftFillNumber(digit: any, targetLength: number = 2) {
        return digit.toString().padStart(targetLength, "0");
    }

    private getStringToHourMinutesSecond(time: string) {
        let parts = time.split(":")
        let response = {
            "hour": 0,
            "minute": 0,
            "second": 0,
            "totalSecond": 0,
        }
        if (!!parts[0]) {
            response.hour = Number(parts[0])
        }
        if (!!parts[1]) {
            response.minute = Number(parts[1])
        }
        if (!!parts[2]) {
            response.second = Number(parts[2])
        }
        response.totalSecond += response.hour * 60 * 60
        response.totalSecond += response.minute * 60
        response.totalSecond += response.second
        return response
    }

    private secondToHMS(seconds: number) {
        let response = {
            "hour": 0,
            "minute": 0,
            "second": 0,
            "time": "",
            "timeWithoutSecond": "",
        }
        let HOUR_IN_SECOND = 60 * 60
        response.hour = Math.floor(seconds / HOUR_IN_SECOND)
        seconds %= HOUR_IN_SECOND
        response.minute = Math.floor(seconds / 60)
        response.second = Math.floor(seconds % 60)
        response.timeWithoutSecond = this.leftFillNumber(response.hour) + ":" + this.leftFillNumber(response.minute)
        response.time = response.timeWithoutSecond + ":" + this.leftFillNumber(response.second)
        return response
    }

    public calculateHours(end: string, start: string) {
        let startTimeParts = this.getStringToHourMinutesSecond(start)
        let endTimeParts = this.getStringToHourMinutesSecond(end)
        let timespan = endTimeParts.totalSecond - startTimeParts.totalSecond
        return this.secondToHMS(timespan)
    }

    public static ins() {
        return new PFDateTimeUtil()
    }
}