// shows the specified card view, hides the rest
function showCardReveal () {
  $('#hidden-activator').click()
  M.AutoInit()
}

function showCardView (id) {
  $(`.card-reveal-container:not(#${id})`).hide()
  $(`#${id}`).show()
}

function showMain () {
  $('#hidden-card-title').click()
  refresh()
}

// fetches spreadsheet data and updates the inventory and picker UI
function refresh () {
  getLoanerSheet().then((response) => {
    inventory = []
    checkInEntry = {}
    $('input[type="text"]').val('').prop('disabled', false)
    $('input[type="checkbox"]').prop('checked', false)
    $('#check-in-form button').text('Next')
    $('#checkin-cbno-confirm').text('')
    $('#checkin-field-verify-container').hide()
    $('#confirm-datestamp').text('')
    $('#confirm-dateline').show()
    $('#confirm-inout').text('')

    let $select = $('#checkout-field-loanerno')
    $select.children(':not(:disabled)').remove()
    $select.children('option:disabled').prop('selected', true)

    for (let i = 0; i < response.result.values.length; ++i) {
      const rowArr = response.result.values[i]
      const cbNo = rowArr[0]
      const row = i + 2
      if (rowArr.length === 1 || rowArr[1] === '') {
        let $opt = $('<option>')
        $opt.text(cbNo)
        $select.append($opt)
        inventory.push({
          'email': '',
          'cbNumber': cbNo,
          'row': row
        })
      } else {
        const studentEmail = rowArr[1]
        inventory.push({
          "email": studentEmail,
          "cbNumber": cbNo,
          "row": row
        })
      }
    }
  }, errorResp => {
    const err = errorResp.result.error
    Swal.fire({ title: 'Error Fetching Spreadsheet', text: `[${err.code}: ${err.status}] ${err.message}` })
  })
}

// resets the return-to-start timer on user activity
function resetTimer () {
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => { showMain() }, 60000)
}

