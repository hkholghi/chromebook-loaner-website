/* eslint-env jquery */

showView(null)

// set up idle timer and null view on load
$(document).ready(function () {
  gapi.load('client:auth2', initGAPI)
  $(this).mousemove(resetTimer)
  $(this).keypress(resetTimer)
})

// map all the buttons
$('#start-check-in').click(() => {
  showView('check-in')
})
$('#start-check-out').click(() => {
  showView('check-out')
})
$('.back-button').click(() => {
  showView('start')
})
$('#confirm-return-home').click(() => {
  showView('start')
})

$('#check-out-form').submit(function (e) {
  e.preventDefault()
  checkOut()
})

$('#check-in-form').submit(function (e) {
  e.preventDefault()
  checkIn()
})

function getCheckedOutByEmail (email) {
  return inventory.find(el => el.email === email)
}
