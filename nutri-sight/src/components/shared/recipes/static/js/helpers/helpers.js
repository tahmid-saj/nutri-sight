import { TIMEOUT_SEC } from "../config/config";

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`The request timed out after ${seconds}`));
    }, seconds * 1000); 
  })
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData ?
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      }) : fetch(url);
      
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};