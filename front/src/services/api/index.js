import "whatwg-fetch";
import "promise-polyfill/src/polyfill";

const config = require("../../config");

export const fetchBrands = () => {
  return fetch(config.remoteIP + "/api/getBrands", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("moda_token")
    }
  })
    .then(response => response.json())
    .then(response => response);
};

export const fetchNonAdminUsers = () => {
  return fetch(config.remoteIP + "/api/fetchNonAdminUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("moda_token")
    }
  })
    .then(response => response.json())
    .then(response => response);
};

export const fetchSalesDataBySKU = data => {
  let url = config.remoteIP + "/api/getSKUSalesByBrand";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("moda_token")
    },
    body: JSON.stringify(data)
  })
    .then(async response => ({
      ...(await response.json()),
      status: response.status
    }))
    .then(response => response);
};

export const fetchSalesData = data => {
  let url = config.remoteIP + "/api/getSalesByBrand";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("moda_token")
    },
    body: JSON.stringify(data)
  })
    .then(async response => ({
      data: await response.json(),
      status: response.status
    }))
    .then(response => response);
};

export const authenticate = data => {
  let url = config.remoteIP + "/api/authenticate";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("moda_token")
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(response => response);
};

export const checkToken = token => {
  return fetch(config.remoteIP + "/api/checkToken", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    }
  })
    .then(response => response.json())
    .then(response => response);
};
