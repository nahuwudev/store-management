import axios from "axios";

const stockInstance = axios.create({
  baseURL: "http://localhost:3001/api/products/",
});

export const getAllProducts = async () => {
  try {
    const response = await stockInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addNewProduct = async (data) => {
  try {
    const response = await stockInstance.post("/create", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (data) => {
  try {
    const response = await stockInstance.patch("/update", {
      productId: data.productId,
      updateProduct: data.updateProduct,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await stockInstance.delete("/delete", {
      data: { productId: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting products:", error);
    throw error;
  }
};
