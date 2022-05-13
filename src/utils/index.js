export const IDEA = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];

export const validationEmail = (email) => {
    const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return EMAIL_PATTERN.test(email)
}

export const displayErrorMessage = (errorMessage) => {
    return <div className='text-[red] text-center mt-2'>
        {errorMessage}
    </div>
}

export const getTimeStamp = (time) => {
    return +new Date(time);
}

export const INITIAL_VALUES = {
    date : "",
    timeStart : "00:00:00",
    timeEnd : "02:00:00"
}

export const convertMinuteToMilliseconds = (minute) => {
    return minute * 60000;
}
export const currentDate = +new Date();

export const convertTimeStampToDateTime = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${date.getHours()< 10? "0" + date.getHours() :date.getHours()}:${date.getMinutes() < 10?"0" +date.getMinutes() :date.getMinutes()}`
}

export const convertMillisecondToMinute = (milliseconds) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const isBlank = (str) => {
    return /^\s*$/.test(str) || !str;
}

export const  sortForDate = (day_one, day_two) => {
    const convertTimeStamp = (time) => {
        return +new Date(time)
    }
    return  convertTimeStamp(day_one.date) - getTimeStamp(day_two.date)
}