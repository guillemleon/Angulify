import axios from 'axios';

const url = 'http://localhost:3000/api';

let APIKit = axios.create({
    baseURL: url

});

export function get(endpoint, successcallback, errorcallback, finalcallback?, headers?) {

    let header = {
        Authorization: undefined,
    };
    if (headers) {
        header = headers;
    }

    APIKit.get(endpoint, {
        headers: header,
    })
      .then((res) => {
          successcallback(res);
      })
      .catch(function (error) {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.length > 0
          ) {
              errorcallback(error.response.data);
          } else {
              errorcallback('Error inesperat');
          }
      })
      .finally(finalcallback);

}

export function post(endpoint, successcallback, errorcallback, body, finalcallback?, headers?) {
    let header = {
        Authorization: undefined,
    };
    if (headers) {
        header = headers;
    }

    console.log("header: " + JSON.stringify(header));
    console.log("body: " + JSON.stringify(body));

    APIKit.post(endpoint, body, {
        headers: header,
    })
      .then((res) => {
          successcallback(res);
      })
      .catch(function (error) {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.length > 0
          ) {
              errorcallback(error.response.data);
          } else {
              errorcallback('Error inesperat');
          }
      })
      .finally(finalcallback);

}

export function put(endpoint, successcallback, errorcallback, body, finalcallback?, headers?) {
  let token = localStorage.getItem('token');
  if (!token) {
    errorcallback("Error amb el token.")
  }

  let header = {}

  if (headers) {
    header = headers
  }

  header["Authorization"] = token;

  APIKit.put(endpoint, body, {
    headers: header
  }).then(res => {
    successcallback(res)
  }).catch(function (error) {
    if (error && error.response && error.response.data && error.response.data.length > 0) {
      errorcallback(error.response.data)
    } else {
      errorcallback("Error inesperat")
    }
  }).finally(finalcallback);
}

export function delete_call(endpoint, successcallback, errorcallback, finalcallback?, headers?) {
  let token = localStorage.getItem('token');
  if (!token) {
    errorcallback("Error amb el token.")
  }

  let header = {}

  if (headers) {
    header = headers
  }

  header["Authorization"] = token;

  APIKit.delete(endpoint,  {
    headers: header
  }).then(res => {
    successcallback(res)
  }).catch(function (error) {
    if (error && error.response && error.response.data && error.response.data.length > 0) {
      errorcallback(error.response.data)
    } else {
      errorcallback("Error inesperat")
    }
  }).finally(finalcallback);
}
