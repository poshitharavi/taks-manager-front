import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchAllTasks = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/task/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const saveTask = async (
  taskData: { title: string; priority: string; dueDate: string },
  token: string
) => {
  try {
    const response = await axios.post(`${API_URL}/task/save`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving task:", error);
    throw error;
  }
};

export const fetchTaskDetails = async (taskId: number, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/task/details/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for task ${taskId}:`, error);
    throw error;
  }
};

export const updateTask = async (
  taskId: number,
  taskData: {
    title: string;
    priority: string;
    dueDate: string;
    status: string;
  },
  token: string
) => {
  try {
    const response = await axios.patch(
      `${API_URL}/task/update/${taskId}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};

export const deleteTask = async (taskId: number, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/task/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    throw error;
  }
};
