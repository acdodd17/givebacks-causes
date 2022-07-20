const base = "https://api.givebacks.com/services/core";

const handleErrors = (response: any) => {
  if (!response.ok) throw response;
  return response.json();
};

export const get = (path: string) => {
  const url = `${base}${path}`;
  return fetch(url).then(handleErrors);
};
