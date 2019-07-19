chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create('index.html', {}, function (win) {
    win.contentWindow.document.addEventListener('keydown', function (e) {
      e.preventDefault()
    })
    win.contentWindow.document.addEventListener('keyup', function (e) {
      e.preventDefault()
    })
  })
})