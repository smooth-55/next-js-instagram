import moment from "moment";

// If you are using moment from the CDN in HTML, no need for the above line.

export const ReadableTime = (date_time: string) => {

    // Get the current time
    const currentTime = moment();

    // Parse the given date_time string into a moment object
    const datetimeMoment = moment(date_time);

    // Calculate the difference between the current time and the given date_time
    const duration = moment.duration(currentTime.diff(datetimeMoment));

    // Get the absolute value of the difference in seconds
    const diffSeconds = Math.abs(duration.asSeconds());

    // Convert the difference to "X years ago", "X months ago", "X weeks ago", "X days ago", "X hours ago", or "X minutes ago"
    let humanReadableTime;
    if (diffSeconds >= 31536000) { // 1 year = 365 days * 24 hours * 60 minutes * 60 seconds
        const yearsAgo = Math.floor(diffSeconds / 31536000);
        humanReadableTime = `${yearsAgo}y ago`;
    } else if (diffSeconds >= 2592000) { // 1 month = 30 days * 24 hours * 60 minutes * 60 seconds
        const monthsAgo = Math.floor(diffSeconds / 2592000);
        humanReadableTime = `${monthsAgo}mo ago`;
    } else if (diffSeconds >= 86400) { // 1 day = 24 hours * 60 minutes * 60 seconds
        const daysAgo = Math.floor(diffSeconds / 86400);
        if (daysAgo >= 7) {
            const weeksAgo = Math.floor(daysAgo / 7);
            humanReadableTime = `${weeksAgo}w ago`;
        } else {
            humanReadableTime = `${daysAgo}d ago`;
        }
    } else if (diffSeconds >= 3600) { // 1 hour = 60 minutes * 60 seconds
        const hoursAgo = Math.floor(diffSeconds / 3600);
        humanReadableTime = `${hoursAgo}h ago`;
    } else {
        const minutesAgo = Math.floor(diffSeconds / 60);
        humanReadableTime = `${minutesAgo}m ago`;
    }

    return humanReadableTime
}

