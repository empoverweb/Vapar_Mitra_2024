import axios from "axios"; 

export const ApiService = { 
    
  handleResponse: (response, toastRef) => {
    if (response.statusCode === 200) {
      toastRef.current.show({ severity: 'success', summary: response.message, detail: response.response, life: 3000 });
    } else {
      toastRef.current.show({ severity: 'error', summary: response.message, detail: response.response, life: 3000 });
    }
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
