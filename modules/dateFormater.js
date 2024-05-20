

export const dateFormater = (dateToBeFormated) => {

    const formatedDate = new Date(dateToBeFormated).toLocaleString([], {day:'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute:'numeric', second:"numeric"})
    return formatedDate
}