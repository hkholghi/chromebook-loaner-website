// Authorization
function initGAPI () {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest', 'https://www.googleapis.com/discovery/v1/apis/admin/directory_v1/rest'],
    clientId: CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/admin.directory.user.readonly'
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus)
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
  }).catch((errorObj) => {
    $('#overlay').hide()
    Swal.fire({
      title: 'Unable to Initialize GAPI',
      text: `[${errorObj.error}] ${errorObj.details}`
    }).then(showGAPIForceRefreshDialog)
  })
}
function updateSignInStatus (isSignedIn) {
  const $overlay = $('#overlay')
  $overlay.hide()
  if (!isSignedIn) {
    Swal.fire('Click OK to trigger sign in')
      .then(() => {
        $overlay.show()
        return gapi.auth2.getAuthInstance().signIn()
      })
      .then(() => {
          showMain()
          $overlay.hide()
        },
        (errorObj) => {
          $overlay.hide()
          Swal.fire({
            title: 'Google Authentication Failed',
            text: `The following error occurred: ${errorObj.error}`,
          }).then(showGAPIForceRefreshDialog())
        })
  } else {
    showMain()
  }
}

function showGAPIForceRefreshDialog () {
  Swal.fire({
    title: 'A Fatal Google API Error Has Occurred',
    text: 'Either user authentication failed or the API could not be initialized. Please reload the page by clicking below to try again.',
    confirmButtonText: 'Reload'
  }).then(() => { window.location.reload(true) })
}

// Check users with Directory API
function getUserInDirectory (email) {
  return gapi.client.directory.users.get({
    userKey: email,
    viewType: 'domain_public'
  })
}

// Fetch
function getLoanerSheet () {
  return gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A2:D100'
  })
}

// Write
function updateSheet (params, body) {
  $('#overlay').show()
  gapi.client.sheets.spreadsheets.values.update(params, body).then(function (goodResponse) {
    $('#overlay').hide()
    showCardView('success-container')
  }, function (errorResponse) {
    $('#overlay').hide()
    const error = errorResponse.result.error
    Swal.fire({
      title: 'An error occurred updating the spreadsheet. Please provide the following information to the Tech Department:',
      text: `[${error.code}: ${error.status}] ${error.message}`
    })
  })
}
