import axios from 'axios';

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const API_BASE_URL = 'https://fakestoreapi.com';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<any>> = {};

const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

export const getProduct = async (id: number) => {
  const cacheKey = `product_${id}`;
  const cachedData = cache[cacheKey];

  if (cachedData && isCacheValid(cachedData.timestamp)) {
    return cachedData.data;
  }

  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  cache[cacheKey] = {
    data: response.data,
    timestamp: Date.now(),
  };
  return response.data;
};

export const getProducts = async () => {
  const cacheKey = 'products';
  const cachedData = cache[cacheKey];

  if (cachedData && isCacheValid(cachedData.timestamp)) {
    return cachedData.data;
  }

  const response = await axios.get(`${API_BASE_URL}/products`);
  cache[cacheKey] = {
    data: response.data,
    timestamp: Date.now(),
  };
  return response.data;
};

export const getCategories = async () => {
  const cacheKey = 'categories';
  const cachedData = cache[cacheKey];

  if (cachedData && isCacheValid(cachedData.timestamp)) {
    return cachedData.data;
  }

  const response = await axios.get(`${API_BASE_URL}/products/categories`);
  cache[cacheKey] = {
    data: response.data,
    timestamp: Date.now(),
  };
  return response.data;
}; 