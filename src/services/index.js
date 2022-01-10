import axios from 'axios';

const baseUrl = 'https://60e84194673e350017c21844.mockapi.io/api';

export const getDeliveries = async () => {
  const url = `${baseUrl}/deliveries`;
  const response = await axios.get(url);

  return response.data;
};

export const postDelivery = async (id, status, latitude, longitude) => {
  console.log('FINISH HIM', id, status);
  const url = `${baseUrl}/finishDelivery`;
  axios
    .post(url, {
      deliveryId: id,
      status: status,
      latitude: Number(latitude),
      longitude: Number(longitude),
    })
    .then(function (response) {
      console.log(response, 'RESPONSE');
    })
    .catch(function (error) {
      console.log(error, 'ERRRRR');
    });
};
