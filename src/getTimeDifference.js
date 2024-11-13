

export default function getTimeDifference(timestamp) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(timestamp)) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
        return `${diffInHours}h`;
    } else if (diffInDays < 30) {
        return `${diffInDays}d`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths}m`;
    } else {
        return `${diffInYears}y`;
    }
};
