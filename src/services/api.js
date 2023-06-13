import axios from "axios";

axios.defaults.baseURL = "https://mobilerepair.onrender.com/api/";

export const getAllbrand = async () => {
  try {
    const { data } = await axios.get("/brand");
    return data;
  } catch (error) {
    return error;
  }
};

export const addModel = async (id, model) => {
  try {
    const { data } = await axios.patch(`/brand/${id}`, model);
    return data;
  } catch (error) {
    return error.message;
  }
};
