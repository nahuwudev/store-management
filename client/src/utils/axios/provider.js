import axios from "axios";

const providerInstance = axios.create({
  baseURL: "http://localhost:3001/api/provider/",
});

export const getAllProviders = async () => {
  try {
    const response = await providerInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};

export const addNewProvider = async (data) => {
  const response = await providerInstance.post("/create", data);
  return response.data;
};

export const updateProvider = async (data) => {
  try {
    const response = await providerInstance.patch("/update", {
      providerId: data.providerId,
      updatedProvider: data.updateProvider,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteProvider = async (providerId) => {
  try {
    const response = await providerInstance.delete("/delete", {
      data: { providerId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
