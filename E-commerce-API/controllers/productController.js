const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");
const Variation = require("../models/variationModel");
const { format } = require("date-fns");
const Color = require("../models/colorsModel");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");
// ** ===================  CREATE PRODUCT  ===================
const createProduct = async (req, res) => {
  // Set the user ID in the request body
  const {
    name,
    stock,
    price,
    specification,
    description,
    linkrv,
    discount,
    categoryId,
    brandId,
    colors,
    isPublish,
  } = req.body;
  const images = req.files;
  let minPrice = null;
  let maxPrice = null;
  try {
    const normalizedName = name.trim().toLowerCase();
    const existingProducts = await Product.find();

    const matchingProduct = existingProducts.find((product) => {
      const productName = product.name.trim().toLowerCase();
      // Loại bỏ khoảng trắng giữa các từ trong tên danh mục
      const normalizedProductName = productName.replace(/\s+/g, "");
      // Loại bỏ khoảng trắng giữa các từ trong tên đã nhập
      const normalizedInputName = normalizedName.replace(/\s+/g, "");

      // So sánh tên danh mục và tên đã nhập đã chuẩn hóa
      return normalizedProductName === normalizedInputName;
    });

    if (matchingProduct) {
      // Tìm thấy danh mục khớp
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        data: { message: "Product with the same name already exists." },
      });
    }
    const imageData = images.map((image) => {
      return {
        url: `http://localhost:5000/public/uploads/${path.basename(
          image.path
        )}`, // Tạo URL cục bộ cho hình ảnh dựa trên đường dẫn tạm thời
      };
    });
    const name_slug = name.trim().toLowerCase().replace(/\s+/g, "-");
    // Create the product object and set the image property
    const product = new Product({
      name,
      name_slug,
      stock,
      price,
      specification,
      description,
      linkrv,
      discount,
      images: imageData,
      category: categoryId,
      brand: brandId,
      colors: [],
      isPublish,
      newPrice: price - (price * discount/100)
      //user: userId
      // Include other properties from req.body
      // For example: tensanpham, soluong, dongia, etc.
    });
    // Kiểm tra xem mảng colors có dữ liệu không
    if (colors && colors.length > 0) {
      for (let i = 0; i < colors.length; i++) {
        const { name, variations, price: colorPrice } = colors[i];

        const newColor = new Color({
          name,
          variations: [],
        });

        if (variations && variations.length > 0) {
          for (const variationData of variations) {
            const { size, price } = variationData;

            const newVariation = new Variation({
              size,
              price,
              color: newColor._id,
            });

            newColor.variations.push(newVariation);

            product.price = null;

            if (minPrice === null || price < minPrice) {
              minPrice = price;
            }
            if (maxPrice === null || price > maxPrice) {
              maxPrice = price;
            }

            await newVariation.save();
          }
        } else {
          if (colorPrice) {
            newColor.price = colorPrice;

            product.price = null;

            if (minPrice === null || colorPrice < minPrice) {
              minPrice = colorPrice;
            }
            if (maxPrice === null || colorPrice > maxPrice) {
              maxPrice = colorPrice;
            }
          } else {
            minPrice = null;
            maxPrice = null;
          }
        }

        await newColor.save();
        product.colors.push(newColor._id);
      }
    }
    product.minPrice = minPrice;
    product.maxPrice = maxPrice;
    product.publishedDate = format(new Date(), "MMM d, eee HH:mm:ss");
    product.updatedAt = format(new Date(), "MMM d, eee HH:mm:ss");
    // Create the product in the database
    await product.save();
    const category = await Category.findById(categoryId);
    category.products.push(product);
    await category.save();

    const brand = await Brand.findById(brandId);
    brand.products.push(product);
    await brand.save();
    product.category = category;
    product.brand = brand;
    await product.save();
    res
      .status(StatusCodes.CREATED)
      .json({ status: "success", data: { product } });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", data: { message: "Lỗi server" } });
  }
};

// ** ===================  GET ALL PRODUCTS  ===================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "category", select: "name" })
      .populate({ path: "brand", select: "name" })
      .populate({
        path: "colors",
        populate: {
          path: "variations",
        },
      });

    if (products.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "error", data: { message: "Không có sản phẩm nào." } });
    }

    res.status(StatusCodes.OK).json({ status: "success", data: products });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", data: { message: "Lỗi server" } });
  }
};

// ** ===================  GET SINGLE PRODUCT  ===================
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const product = await Product.findOne({ _id: productId })
      .populate({ path: "category", select: "name" })
      .populate({ path: "brand", select: "name" })
      .populate({
        path: "colors",
        populate: {
          path: "variations",
        },
      });

    if (!product) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({
          status: "error",
          data: { message: `No product with the id ${productId}` },
        });
    } else {
      res.status(StatusCodes.OK).json({ status: "success", data: product });
    }
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", data: { message: "Lỗi server" } });
  }
};
// ** ===================  UPDATE PRODUCT  ===================
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  const images = req.files;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({
          status: "error",
          data: { message: "Không tìm thấy sản phẩm" },
        });
    }

    // Kiểm tra nếu có hình ảnh mới được tải lên
    if (images && images.length > 0) {
      // Xóa tất cả hình ảnh cũ bằng cách gỡ bỏ tệp hình ảnh cục bộ
      const uploadDirectory = "./public/uploads";
      // Xóa hình ảnh cục bộ
      product.images.forEach((image) => {
        const imagePath = path.join(uploadDirectory, path.basename(image.url));

        if (fs.existsSync(imagePath)) {
          try {
            fs.unlinkSync(imagePath);
          } catch (error) {
            console.error(`Lỗi khi xóa tệp ${imagePath}: ${error.message}`);
          }
        }
      });

      // Lưu hình ảnh mới vào thư mục cục bộ và cập nhật đường dẫn
      const imageData = images.map((image) => {
        return {
          url: `http://localhost:5000/public/uploads/${path.basename(
            image.path
          )}`, // Tạo URL cục bộ cho hình ảnh dựa trên đường dẫn tạm thời
        };
      });

      // Cập nhật mảng ảnh của sản phẩm với các đối tượng hình ảnh mới
      product.images = imageData;
    }
    if (updatedData.name) {
      const normalizedName = updatedData.name.trim().toLowerCase();
      const existingProducts = await Product.find();

      const matchingProduct = existingProducts.find((existingProduct) => {
        const productName = existingProduct.name.trim().toLowerCase();
        const normalizedProductName = productName.replace(/\s+/g, "");
        const normalizedInputName = normalizedName.replace(/\s+/g, "");
        return (
          normalizedProductName === normalizedInputName &&
          existingProduct._id.toString() !== productId
        );
      });

      if (matchingProduct) {
        return res.status(400).json({
          status: "error",
          data: { message: "Tên sản phẩm đã tồn tại." },
        });
      }
    }

    if (product.ordersCount > 0) {
      // Cho phép chỉ cập nhật thuộc tính 'stock', các thuộc tính khác có thể cập nhật
      if (updatedData.stock !== undefined || updatedData.price !==undefined) {
        // Cập nhật thuộc tính 'stock'
        if (updatedData.stock !== undefined) {
          // Cập nhật thuộc tính 'stock'
          product.stock = updatedData.stock;
          product.isPublish = updatedData.isPublish;
        }
        if (updatedData.price !== undefined) {
          // Cập nhật thuộc tính 'price'
          product.price = updatedData.price;
          product.isPublish = updatedData.isPublish;
        }
      } else {
        // Nếu không cập nhật 'stock', trả về lỗi
        return res.status(400).json({
          status: "error",
          data: { message: "Không thể cập nhật thuộc tính khác khi đã có đơn hàng." },
        });
      }
    } else {
      // Cập nhật thông tin khác của sản phẩm từ req.body
      Object.assign(product, updatedData);
    }
    product.newPrice = product.price - (product.price * product.discount/100);
    // Cập nhật ngày cập nhật
    product.updatedAt = format(new Date(), "MMM d, eee HH:mm:ss");
    
    // Cập nhật màu sắc và biến thể nếu có
    if (updatedData.colors) {
      // Xóa toàn bộ màu sắc và biến thể cũ
      await Color.deleteMany({ _id: { $in: product.colors } });
      await Variation.deleteMany({ color: { $in: product.colors } });
    
      // Tạo mới màu sắc với biến thể
      const newColors = updatedData.colors.map((colorData) => {
        const { name, variations, price } = colorData;
    
        const newColor = new Color({
          name,
          variations: [],
        });
    
        if (variations && variations.length > 0) {
          for (const variationData of variations) {
            const { size, price } = variationData;
    
            const newVariation = new Variation({
              size,
              price,
              color: newColor._id,
            });
    
            newColor.variations.push(newVariation);
            newVariation.save();
          }
        } else {
          if (price) {
            newColor.price = price;
          }
        }
    
        return newColor;
      });
    
      // Thêm mới màu sắc vào sản phẩm và lưu chúng
      product.colors = newColors.map((color) => color._id);
      await Color.insertMany(newColors);
    }
    
    // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
    await product.save();
    
    res.json({ status: "success", data:  product  });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ status: "error", data: { message: "Lỗi server" } });
  }
};

// ** ===================  DELETE PRODUCT  ===================
const deleteProduct = async (req, res) => {
  const productId = req.params.id; // Extract the productId from the request body

  if (!productId) {
    return res
      .status(400)
      .json({
        status: "error",
        data: { message: "Missing productId in request body" },
      });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({
          status: "error",
          data: { message: "Không tìm thấy sản phẩm" },
        });
    }

    // Kiểm tra nếu ordersCount bằng 0 mới thực hiện xóa sản phẩm
    if (product.ordersCount === 0) {
      // Xóa toàn bộ màu sắc và biến thể liên quan đến sản phẩm
      await Color.deleteMany({ _id: { $in: product.colors } });
      await Variation.deleteMany({ color: { $in: product.colors } });

      const categoryId = product.category;
      const brandId = product.brand;

      // Xóa sản phẩm khỏi danh sách sản phẩm (products) của danh mục và thương hiệu
      const [category, brand] = await Promise.all([
        Category.findById(categoryId),
        Brand.findById(brandId),
      ]);

      if (category) {
        category.products.pull(productId);
        await category.save();
      }

      if (brand) {
        brand.products.pull(productId);
        await brand.save();
      }

      const uploadDirectory = "./public/uploads";
      // Xóa hình ảnh cục bộ
      product.images.forEach((image) => {
        const imagePath = path.join(uploadDirectory, path.basename(image.url));

        if (fs.existsSync(imagePath)) {
          try {
            fs.unlinkSync(imagePath);
          } catch (error) {
            console.error(`Lỗi khi xóa tệp ${imagePath}: ${error.message}`);
          }
        }
      });

      // Thực hiện xóa sản phẩm
      await Product.findByIdAndDelete(productId);

      return res.json({
        status: "success",
        data: { message: "Sản phẩm đã được xóa" },
      });
    } else {
      return res
        .status(400)
        .json({
          status: "error",
          data: { message: "Sản phẩm có đơn đặt hàng, không thể xóa" },
        });
    }
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ status: "error", data: { message: "Lỗi server" } });
  }
};

// ** ===================  UPLOAD IMAGE PRODUCT  ===================
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller 1MB");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
