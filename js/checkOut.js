function checkOut () {
  const email = getAFSEmail($('#checkout-field-email').val())
  const loaner = $('#checkout-field-loanerno option:selected').val()
  if (email === null) {
    Swal.fire('You must enter your AFS email address or username')
    return
  }
  if (isEmpty(loaner) || loaner === 'Select') {
    Swal.fire('You must select the loaner you are checking out')
    return
  }
  const curCheckedOut = getCheckedOutByEmail(email)
  if (curCheckedOut !== undefined) {
    Swal.fire(`You have already checked out Chromebook ${curCheckedOut.cbNumber}. Please return it before attempting to check out another.`)
    return
  }
  const isRepair = $('#checkout-field-repair')[0].checked
  
  const toCheckOut = inventory.find(el => el.cbNumber === loaner)
  // reusable date object
  // we'll use it for the cur locate str for the spreadsheet, and then again to compute return date
  const date = new Date()
  
  const params = {
    spreadsheetId: SPREADSHEET_ID,
    range: `!B${toCheckOut.row}:D${toCheckOut.row}`,
    valueInputOption: 'USER_ENTERED'
  }
  const body = {
    values: [[email, isRepair ? 'TRUE' : 'FALSE', date.toLocaleDateString()]]
  }
  
  // prep confirm screen
  $('#confirm-inout').text('out')
  if (isRepair) {
    $('#confirm-dateline').hide()
  } else {
    date.setDate(date.getDate() + ALLOWABLE_CHECKOUT_TIME_DAYS)
    if (date.getDay() > 5) { // it's a weekend—kick to Monday
    date.setDate(date.getDate() + (date.getDay() === 0 ? 1 : 2))
  }
  const retDateStr = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  $('#confirm-datestamp').text(retDateStr)
}
updateSheet(params, body)
}
