function fetchResource() {
  // Simulate the response headers
  var contentType = 'text/html; charset=UTF-8';
  var lastModified = 'Mon, 24 May 2023 10:00:00 GMT';

  // Display the headers in the HTML
  document.getElementById('contentType').textContent = contentType;
  document.getElementById('lastModified').textContent = lastModified;

  // Show the headers container
  document.getElementById('headersContainer').style.display = 'block';
}