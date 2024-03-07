import axios from "axios";

const shipmentInstance = axios.create({
  baseURL: "http://localhost:3001/api/shipment/",
});

export const getAllShipment = async () => {
  try {
    const response = await shipmentInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};

export const addNewProvider = async (data) => {
  const response = await shipmentInstance.post("/create", data);
  return response.data;
};

export const deleteShipment = async () => {
  const response = await shipmentInstance.delete("/delete", {
    shipmentId: data,
  });
  try {
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
