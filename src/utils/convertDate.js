import jMoment from "moment-jalaali";

export const ConvertDateToJalali = (date) => {
    try {
        return jMoment(date).format("jYYYY/jMM/jDD");
    } catch (error) {
        console.error("Error converting date to Jalali:", error);
        return null;
    }
}
