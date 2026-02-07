import api from '../services/api';

export const productService = {
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data; 
  },

  getProductById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData: { name: string, description: string, price: number, category: string, image: string }) => {
    const response = await api.post('/products', productData);
    return response.data;
  }
};