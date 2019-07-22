// GAPI stuff
const SPREADSHEET_ID = '1HUE5eJoR2X1UYEm2VWyLYliN-5Kxi2FyfuZAE_B9t9Q'
const API_KEY = 'AIzaSyCyrIqqxhCCKjf3GV8sZ9QOJzlM-ALvE6s'
const CLIENT_ID = '571797694864-673e0adnaejd7n995j0t7pfpo2js3868.apps.googleusercontent.com'

// timer to detect inactivity—we'll bounce back to the start screen after 1 minute
// this has the happy side effect of also running refresh() every minute
let idleTimer

// global list of people who've already checked out Chromebooks
let inventory = []

// stores the entry we're about to check in during the transition between check-in states
let checkInEntry = {}
