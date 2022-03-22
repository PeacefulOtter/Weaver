

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

export const formatDate = (date: string) => {
    const d = new Date(date)
    const day = d.getDate()
    const month = monthNames[d.getMonth()].substring(0, 3)
    const year = d.getFullYear()
    return day + ' ' + month + ' ' + year
}

export const formatTime = (ms: number) => {

    const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
  
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}