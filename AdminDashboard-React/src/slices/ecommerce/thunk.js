import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
  getProducts as getProductsApi,
  getProductById as getProductByIdApi,
  deleteProducts as deleteProductsApi,
  getOrders as getOrdersApi,
  getOrderById as getOrderByIdApi,
  getSellers as getSellersApi,
  getCustomers as getCustomersApi,
  updateOrder as updateOrderApi,
  deleteOrder as deleteOrderApi,
  addNewOrder as addNewOrderApi,
  addNewCustomer as addNewCustomerApi,
  updateCustomer as updateCustomerApi,
  deleteCustomer as deleteCustomerApi,
  addNewProduct as addNewProductApi,
  updateProduct as updateProductApi,
  getBrands as getBrandsApi, 
  getCategories as getCategoriesApi,
  addNewCategory as addNewCategoryApi,
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
  addNewBrand as addNewBrandApi,
  updateBrand as updateBrandApi,
  deleteBrand as deleteBrandApi,
} from "../../helpers/fakebackend_helper";

export const getProducts = createAsyncThunk("ecommerce/getProducts", async () => {
  try {
    const response = await getProductsApi();
    return response;
  } catch (error) {
    throw error;
  }
});
// Định nghĩa một thunk để lấy sản phẩm dựa trên ID
export const getProductById = createAsyncThunk("ecommerce/getProductById", async (productId) => {
  try {
    // Gọi hàm API để lấy sản phẩm dựa trên productId (giả sử bạn có một hàm API tương tự getOrderByIdApi)
    const response = await getProductByIdApi(productId);
    return response;
  } catch (error) {
    throw error;
  }
});


export const getOrders = createAsyncThunk("ecommerce/getOrders", async () => {
  try {
    const response = await getOrdersApi();
    return response;
  } catch (error) {
    throw error;
  }
});
// Định nghĩa một thunk để lấy đơn hàng dựa trên id
export const getOrderById = createAsyncThunk("ecommerce/getOrderById", async (orderId) => {
  try {
    // Gọi hàm API để lấy đơn hàng dựa trên orderId
    const response = await getOrderByIdApi(orderId);
    return response;
  } catch (error) {
    throw error;
  }
});

export const getSellers = createAsyncThunk("ecommerce/getSellers", async () => {
  try {
    const response = await getSellersApi();
    return response;
  } catch (error) {
    throw error;
  }
});

export const getCustomers = createAsyncThunk("ecommerce/getCustomers", async () => {
  try {
    const response = await getCustomersApi();
    return response;
  } catch (error) {
    throw error;
  }
});

export const deleteProducts = createAsyncThunk("ecommerce/deleteProducts", async (product) => {
  try {
    const response = await deleteProductsApi(product);
    toast.success("Product Delete Successfully", { autoClose: 3000 });
    return { product, ...response };
  } catch (error) {
    toast.error("Product Delete Failed", { autoClose: 3000 });
    throw error;
  }
});

export const updateOrder = createAsyncThunk("ecommerce/updateOrder", async (order) => {
  try {
    const response = updateOrderApi(order);
    const data = await response;
    toast.success("Order Updateded Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Order Updateded Failed", { autoClose: 3000 });
    throw error;
  }
});

export const addNewProduct = createAsyncThunk("ecommerce/addNewProduct", async (product) => {
  try {
    const response = addNewProductApi(product);
    const data = await response;
    toast.success("Product Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Product Added Failed", { autoClose: 3000 });
    throw error;
  }
});

export const updateProduct = createAsyncThunk("ecommerce/updateProduct", async (product) => {
  try {
    const response = updateProductApi(product);
    const data = await response;
    console.log(data);
    toast.success("Product Updateded Successfully", { autoClose: 3000 });
    return data;
  }
  catch (error) {
    toast.error("Product Updateded Failed", { autoClose: 3000 });
    throw error;
  }
});

export const deleteOrder = createAsyncThunk("ecommerce/deleteOrder", async (order) => {
  try {
    const response = await deleteOrderApi(order);
    toast.success("Order Deleted Successfully", { autoClose: 3000 });
    return { order, ...response };
  } catch (error) {
    toast.error("Order Deleted Failed", { autoClose: 3000 });
    throw error;
  }
});

export const addNewOrder = createAsyncThunk("ecommerce/addNewOrder", async (order) => {
  try {
    const response = addNewOrderApi(order);
    const data = await response;
    toast.success("Order Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Order Added Failed", { autoClose: 3000 });
    throw error;
  }
});

export const updateCustomer = createAsyncThunk("ecommerce/updateCustomer", async (customer) => {
  try {
    const response = updateCustomerApi(customer);
    const data = await response;
    toast.success("Customer Updateded Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Customer Updateded Failed", { autoClose: 3000 });
    throw error;
  }
});

export const deleteCustomer = createAsyncThunk("ecommerce/deleteCustomer", async (customer) => {
  try {
    const response = await deleteCustomerApi(customer);
    toast.success("Customer Deleted Successfully", { autoClose: 3000 });
    return { customer, ...response }
  } catch (error) {
    toast.error("Customer Deleted Failed", { autoClose: 3000 });
    throw error;
  }
});

export const addNewCustomer = createAsyncThunk("ecommerce/addNewCustomer", async (customer) => {
  try {
    const response = addNewCustomerApi(customer);
    const data = await response;
    toast.success("Customer Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Customer Added Failed", { autoClose: 3000 });
    throw error;
  }
});
export const getCategories = createAsyncThunk("ecommerce/getCategories", async () => {
  try {
    const response = await getCategoriesApi(); // Gọi API để lấy danh sách danh mục
    return response;
  } catch (error) {
    throw error;
  }
});

export const updateCategory = createAsyncThunk("ecommerce/updateCategory", async (category) => {
  try {
    const response = updateCategoryApi(category); // Gọi API cập nhật thông tin danh mục
    const data = await response;
    toast.success("Category Updated Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Category Updated Failed", { autoClose: 3000 });
    throw error;
  }
});

export const deleteCategory = createAsyncThunk("ecommerce/deleteCategory", async (category) => {
  try {
    const response = await deleteCategoryApi(category); // Gọi API xóa danh mục
    toast.success("Category Deleted Successfully", { autoClose: 3000 });
    return { category, ...response };
  } catch (error) {
    toast.error("Category Deleted Failed", { autoClose: 3000 });
    throw error;
  }
});

export const addNewCategory = createAsyncThunk("ecommerce/addNewCategory", async (category) => {
  try {
    const response = addNewCategoryApi(category); // Gọi API thêm danh mục mới
    const data = await response;
    toast.success("Category Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Category Added Failed", { autoClose: 3000 });
    throw error;
  }
});

export const getBrands = createAsyncThunk("ecommerce/getBrands", async () => {
  try {
    const response = await getBrandsApi(); // Gọi API để lấy danh sách thương hiệu
    return response;
  } catch (error) {
    throw error;
  }
});

export const updateBrand = createAsyncThunk("ecommerce/updateBrand", async (brand) => {
  try {
    const response = updateBrandApi(brand); // Gọi API cập nhật thông tin thương hiệu
    const data = await response;
    toast.success("Brand Updated Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Brand Updated Failed", { autoClose: 3000 });
    throw error;
  }
});

export const deleteBrand = createAsyncThunk("ecommerce/deleteBrand", async (brand) => {
  try {
    const response = await deleteBrandApi(brand); // Gọi API xóa thương hiệu
    toast.success("Brand Deleted Successfully", { autoClose: 3000 });
    return { brand, ...response };
  } catch (error) {
    toast.error("Brand Deleted Failed", { autoClose: 3000 });
    throw error;
  }
});

export const addNewBrand = createAsyncThunk("ecommerce/addNewBrand", async (brand) => {
  try {
    const response = addNewBrandApi(brand); // Gọi API thêm thương hiệu mới
    const data = await response;
    toast.success("Brand Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Brand Added Failed", { autoClose: 3000 });
    throw error;
  }
});
