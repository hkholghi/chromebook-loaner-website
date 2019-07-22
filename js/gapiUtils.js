// Authorization
function initGAPI () {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest'],
    clientId: CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/spreadsheets'
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus)
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
    $('#overlay').hide()
    showView('start')
  }).catch((errorObj) => {
    $('#overlay').hide()
    Swal.fire({
      title: 'Unable to Authenticate GAPI',
      text: `[${errorObj.error}] ${errorObj.details}`
    })
  })
}
function updateSignInStatus (isSignedIn) {
  if (!isSignedIn) {
    gapi.auth2.getAuthInstance().signIn()
  }
}

// Fetch
function getLoanerSheet () {
  return gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "'sheet1'!A2:D100"
  })
}

// Write
function updateSheet (params, body) {
  $('#overlay').fadeIn(100)
  return gapi.client.sheets.spreadsheets.values.update(params, body).then(function (goodResponse) {
    $('#overlay').fadeOut(100)
    showView('confirmation')
  }, function (errResponse) {
    $('#overlay').fadeOut(100)
    const error = errResponse.result.error
    Swal.fire({
      title: 'An error occurred updating the spreadsheet. Please provide the following information to the Tech Department',
      text: `[${error.code}: ${error.status}] ${error.message}`
    })
  })
}
