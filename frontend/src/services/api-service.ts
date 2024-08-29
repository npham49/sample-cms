import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { PostCreate } from "../types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const useAPIProvider = () => {
  const { getToken } = useAuth();

  async function getPosts() {
    const token = await getToken();

    const response = await axios
      .get(`${apiUrl}/api/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    return response;
  }

  async function createPost(data: PostCreate) {
    const token = await getToken();

    const response = await axios
      .post(`${apiUrl}/api/posts`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    return response;
  }

  async function getCategories() {
    const token = await getToken();

    const response = await axios
      .get(`${apiUrl}/api/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    return response;
  }

  async function createCategory(name: string) {
    const token = await getToken();

    const response = await axios
      .post(
        `${apiUrl}/api/categories`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);
    return response;
  }

  return { getPosts, createPost, getCategories, createCategory };
};
