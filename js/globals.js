// GAPI stuff
const SPREADSHEET_ID = '1-df4sBEvoruJ1gfDAoM8KxuT-punZVM_I6hn3n4s8eg'
const API_KEY = 'AIzaSyBQlD8VlVSSCM7R7Ee28cTCfmeMD8k6qqI'
const CLIENT_ID = '959881065666-i18jd0f3fquldpskckv5cbnv3r2kvd1u.apps.googleusercontent.com'

// timer to detect inactivity—we'll bounce back to the start screen after 1 minute
// this has the happy side effect of also running refresh() every minute
let idleTimer

// global list of people who've already checked out Chromebooks
let inventory = []

// stores the entry we're about to check in during the transition between check-in states
let checkInEntry = {}
