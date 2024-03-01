import axios from "axios";

export const ApiService = {
    
  handleResponse: (response) => {
    const success = response.status >= 200 && response.status < 300;
    return { success, data: response.data };
  },
    
  getData: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error.response) {

        console.error("Request failed with status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      throw error; // Re-throwing the error to be handled by the caller
    }
  }, 
    
  postData: async (url, payload) => {
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Request failed with status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      throw error;
    }
  } 
};
