export default function getFlikrAPIResponse(url) {
  return new Promise(function (resolve, reject) {
    // create new request
    var request = new XMLHttpRequest();
    request.open("GET", url);
    // do this function after request is sent
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // the request has finished when readystate is 4
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
    };
    request.onerror = function () {
      reject(Error("Network Error"));
    };
    request.send();
  });
}
