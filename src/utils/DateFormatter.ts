type isoDate = string;

interface DateTimeInfo {
    day: number,
    month: number,
    year: number,
    hours: number,
    minutes: number
}

export class DateUtil {
    private static extractDateTimeInfo(dateTime: isoDate)
    : DateTimeInfo {
        const date = new Date(dateTime);
        
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-indexed
        const year = date.getFullYear();
        
        // Extract time components
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return { day, month, year, hours, minutes };
    }

    private static to2DigitString(number: number): string{
        return String(number).padStart(2, '0')
    }

    static getDateTime(dateTime: isoDate): string{
        return `${this.getDate(dateTime)} о ${this.getTime(dateTime)}`;
    }

    static getTime(dateTime: isoDate): string{
        const dateTimeInfo: DateTimeInfo = this.extractDateTimeInfo(dateTime);

        const hours = this.to2DigitString(dateTimeInfo.hours)
        const minutes = this.to2DigitString(dateTimeInfo.minutes)
        return `${hours}:${minutes}`
    }

    static getDate(dateTime: isoDate): string{
        const dateTimeInfo: DateTimeInfo = this.extractDateTimeInfo(dateTime);

        const day = this.to2DigitString(dateTimeInfo.day)
        const month = this.to2DigitString(dateTimeInfo.month)
        
        return `${day}.${month}.${dateTimeInfo.year}`;
    }

    static isToday(dateTime: isoDate): boolean{
        const dateTimeInfo: DateTimeInfo = this.extractDateTimeInfo(dateTime);
        const todayInfo: DateTimeInfo = this.extractDateTimeInfo(new Date().toString())
        
        return dateTimeInfo.year == todayInfo.year
        && dateTimeInfo.month == todayInfo.month
        && dateTimeInfo.day == todayInfo.day
    }
}