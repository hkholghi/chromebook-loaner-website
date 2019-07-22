function checkIn () {
    const $submitButton = $('#check-in-form button')
	if ($submitButton.text() === 'Next') {
	    const email = getAFSEmail($('#checkin-email').val())
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
        $('label[for="checkin-field-verify"]').show()
        $('#checkin-email').prop('disabled', true)
        checkInEntry = curCheckedOut
        $submitButton.text('Check In')
	} else {
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
	        range: `'sheet1'!B${checkInEntry.row}:D${checkInEntry.row}`,
	        valueInputOption: 'USER_ENTERED'
	    }
	    const body = {
	        values: [['', 'FALSE', '']]
	    }
	    $('#confirm-inout').text('in')
	    $('#confirm-dateline').hide()
	    updateSheet(params, body)
	}
}
