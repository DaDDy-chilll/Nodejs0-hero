const productModel = require("./products.model");
module.exports = {
  Query: {
    products: () => {
      return productModel.getALlProducts();
    },
    productsByPrice: (_, args) => {
      return productModel.getProductsByPrice(args.min, args.max);
    },
    product: (_, args) => {
      return productModel.getProductById(args.id);
    },
  },
  Mutation: {
    addNewProduct: (_, args) => {
      return productModel.addNewProduct(args.id, args.description, args.price);
    },
    addNewProductReview: (_, args) => {
      return productModel.addNewProductReview(
        args.id,
        args.rating,
        args.comment
      );
    },
  },
};
