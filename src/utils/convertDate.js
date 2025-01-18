export const ConvertDateToJalali = (date)=>{
    return jMoment(date).format("jYYYY/jMM/jDD")
}