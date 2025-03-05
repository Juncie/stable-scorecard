export const sendToZapier = async (data) => {
  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  const hookURL = process.env.NEXT_PUBLIC_ZAPIER_URL;

  fetch(hookURL, requestOptions)
    .then((response) => response.text())
    .then((result) => console.table(result))
    .catch((error) => console.error(error));
};
