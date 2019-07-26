/* eslint-env jquery */

// set up idle timer and gapi on load
$(document).ready(function () {
  gapi.load('client:auth2', initGAPI)
  $(this).mousemove(resetTimer)
  $(this).keypress(resetTimer)
})

// map all the buttons
$('#start-check-in').click(() => {
  showCardView('check-in-form-container')
  showCardReveal()
})
$('#start-check-out').click(() => {
  showCardView('check-out-form-container')
  showCardReveal()
})
$('.card-title-actionless i').click(() => {
  showMain()
})
$('#check-out-form').submit(function (e) {
  e.preventDefault()
  checkOut()
})

$('#check-in-form').submit(function (e) {
  e.preventDefault()
  checkIn()
})
