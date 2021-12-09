import getType from "../getType";

const getDayDifference = (firstDate, secondDate = new Date()) => {
    if (getType(firstDate) === "undefined" || getType(secondDate) === "undefined") return undefined;

    const date = {
        first: new Date(firstDate).toJSON().split("T").shift().replace(/-+/g, "/"),
        second: new Date(secondDate).toJSON().split("T").shift().replace(/-+/g, "/"),
    };

    if (Object.values(date).includes("Invalid Date")) return undefined;

    const first = new Date(date.first);
    const second = new Date(date.second);

    const dayDifference = Math.abs(
        (first - second) / 1000 / 60 / 60 / 24 - (first.getTimezoneOffset() - second.getTimezoneOffset()) / (60 * 24)
    );

    return dayDifference;
};

export default getDayDifference;
