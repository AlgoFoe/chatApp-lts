export function extractTime(dateString) {
    const date = new Date(dateString);

	const ISTOffset = 5.5 * 60 * 60 * 1000;
    const dateIST = new Date(date.getTime() + ISTOffset);

    let hours = dateIST.getUTCHours();
    const minutes = dateIST.getUTCMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    const timeStr = `${hours}:${minutesStr} ${ampm}`;
    return timeStr;
}

