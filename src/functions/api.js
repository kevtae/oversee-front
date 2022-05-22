import axios from "axios";

const API_URL = "https://oversee-backend.herokuapp.com/api";

export const getNodes = async () => {
  return await axios.get(`${API_URL}/getNode`);
};

export const getEdges = async () => {
  return await axios.get(`${API_URL}/getEdge`);
};

export const createNode = async (
  nodeName,
  linkUrl,
  description,
  position,
  type,
  label
) => {
  return await axios.post(
    `${API_URL}/createNode`,
    {
      nodeName,
      linkUrl,
      description,
      position,
      type,
      label,
    },
    { headers: {} }
  );
};

export const updateNode = async (nodeId, keyList) => {
  return await axios.patch(`${API_URL}/updateNode/${nodeId}`, {
    keyId: keyList,
  });
};

export const initializeAddressTransactions = async (address) => {
  return await axios.get(`${API_URL}/transaction/${address}`);
};

export const getAddressTransactions = async (address) => {
  return await axios.get(`${API_URL}/getTransaction`);
};
