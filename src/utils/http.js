const base = "https://api.givebacks.com/services/core";

const handleErrors = (response) => {
  if (!response.ok) throw response;
  return response.json();
};

export const get = (path) => {
  const url = `${base}${path}`;
  return fetch(url).then(handleErrors);
};
