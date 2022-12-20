export function getDateFormat(): string {
    let d = new Date()
    let currDate = d.getDate().toString()
    let currMonth = (d.getMonth() + 1).toString()
    let currYear = d.getFullYear()
    if (currMonth.length < 2) {
        currMonth = '0' + currMonth
    }
    if (currDate.length < 2) {
        currDate = '0' + currDate
    }
    return (currYear + '-' + currMonth + '-' + currDate)
}
