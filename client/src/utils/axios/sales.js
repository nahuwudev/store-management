import axios from "axios";

const salesInstance = axios.create({
  baseURL: "http://localhost:3001/api/sales/",
});

export const getAllSales = async () => {
  try {
    const response = await salesInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};

export const addNewSale = async (data) => {
  try {
    const response = await salesInstance.post("/create", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching provider:", error);
    throw error;
  }
};

export const updateSale = async (data) => {
  try {
    const response = await salesInstance.patch("/update", {
      saleId: data.saleId,
      updateSale: data.updateSale,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteSale = async (id) => {
  try {
    const response = await salesInstance.delete("/delete", {
      data: { saleId: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
