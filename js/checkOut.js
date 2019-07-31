function checkOut () {
  const email = getAFSEmail($('#checkout-field-email').val())
  const loaner = $('#checkout-field-loanerno option:selected').val()

  // make sure all fields exist and are safe, etc.
  if (email === null) {
    Swal.fire('You must enter your AFS email address or username')
    return
  }
  if (isEmpty(loaner) || loaner === 'Select') {
    Swal.fire('You must select the loaner you are checking out')
    return
  }

  // ensure they haven't already checked one out
  const curCheckedOut = getCheckedOutByEmail(email)
  if (curCheckedOut !== undefined) {
    Swal.fire(`You have already checked out Chromebook ${curCheckedOut.cbNumber}. Please return it before attempting to check out another.`)
    return
  }

  const isRepair = $('#checkout-field-repair')[0].checked
  const toCheckOut = inventory.find(el => el.cbNumber === loaner)

  if (toCheckOut === undefined) {
    Swal.fire('The specified loaner does not exist. Please ask a member of the tech department for assistance.')
    return
  }

  // make sure that the email address is valid—this takes a bit, so start the overlay now
  $('#overlay').fadeIn(100)

  getUserInDirectory(email).then(function (goodResponse) {
    // date for the cur locale str for the spreadsheet
    const today = new Date()
    const params = {
      spreadsheetId: SPREADSHEET_ID,
      range: `B${toCheckOut.row}:D${toCheckOut.row}`,
      valueInputOption: 'USER_ENTERED'
    }
    const body = {
      values: [[email, isRepair ? 'TRUE' : 'FALSE', today.toLocaleDateString()]]
    }

    // prep confirm screen
    $('#confirm-inout').text('out')
    if (isRepair) {
      $('#confirm-dateline').hide()
    }
    updateSheet(params, body)
  }, function (errorResponse) {
    $('#overlay').hide()
    Swal.fire('That email does not exist in the Abington Friends domain. Ensure that you have not made any typos.')
  })
}
