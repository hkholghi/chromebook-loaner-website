function checkIn () {
  const $submitButton = $('#check-in-form button')
  if ($submitButton.text() === 'Next') {
    // Check-in phase 1: verify the email is valid and find the associated loaner
    const $emailField = $('#checkin-field-email')
    const email = getAFSEmail($emailField.val())
    if (email === null) {
      Swal.fire('You must enter a valid AFS email or username')
      return
    }
    let curCheckedOut = getCheckedOutByEmail(email)
    if (curCheckedOut === undefined) {
      Swal.fire('You do not currently have a Chromebook checked out.')
      return
    }
    $('#checkin-cbno-confirm').text(curCheckedOut.cbNumber)
    $('#checkin-field-verify-container').show()
    $emailField.prop('disabled', true)
    checkInEntry = curCheckedOut
    $submitButton.text('Check In')
  } else {
    // Check-in phase 2: have user verify CB number and complete check-in
    if (!($('#checkin-field-verify')[0].checked)) {
      Swal.fire('Please verify the number of the Chromebook you are returning')
      return
    }
    if (checkInEntry.row === undefined) {
      Swal.fire('The spreadsheet row for your loaner could not be found. Please ask a member of the Technology Department for assistance.')
      return
    }
    const params = {
      spreadsheetId: SPREADSHEET_ID,
      range: `B${checkInEntry.row}:D${checkInEntry.row}`,
      valueInputOption: 'USER_ENTERED'
    }
    // set the spreadsheet row to empty, unchecked checkbox, empty (CB no. persists in col 1)
    const body = {
      values: [['', 'FALSE', '']]
    }
    $('#confirm-inout').text('in')
    $('#confirm-dateline').hide()
    updateSheet(params, body)
  }
}
