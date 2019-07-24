// validates an AFS email/username and converts usernames to full email addresses
function getAFSEmail(email) {
  if (/^2[0-9][a-zA-Z]+@abingtonfriends\.net$/.test(email)) {
    return email
  } else if (/^2[0-9][a-zA-Z]+$/.test(email)) {
    return `${email}@abingtonfriends.net`
  } else {
    return null
  }
}

// checks if a string is any of empty/undefined/null
function isEmpty (txt) {
  return txt === '' || txt === undefined || txt === null
}