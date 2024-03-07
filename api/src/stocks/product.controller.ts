import { ProductService } from "./product.service";
import { Request, Response } from "express";
import { logger } from "../../winston/logger";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { config } from "../../config";

export class ProductsController {
  service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  findById = (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      if (!productId) {
        logger.info(`Error finding the product`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const product = this.service.findById(productId);

      if (product === null) {
        logger.info(`Error finding the product`);
        return res.status(StatusCodes.NOT_FOUND).json({
          message: getReasonPhrase(StatusCodes.NOT_FOUND),
        });
      }
      return res.status(200).json(product);
    } catch (error) {
      logger.error(`Error finding id from the method: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  findAll = (_req: Request, res: Response) => {
    try {
      const products = this.service.findAll();
      return res.status(200).json(products);
    } catch (error) {
      logger.error(`cant resolve the method: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  createProduct = (req: Request, res: Response) => {
    try {
      const { product } = req.body;

      if (!product) {
        logger.info(`missing product details`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const newProduct = this.service.createProduct(product);

      logger.info("Product created Successfully");
      return res.status(200).json(newProduct);
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  deleteProduct = (req: Request, res: Response) => {
    try {
      const { productId } = req.body;

      if (!productId) {
        logger.info(`missing productId`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      this.service.deleteProduct(productId.productId);

      logger.info("product deleted sucessfully");
      return res.status(200).json({ message: "product deleted sucessfully" });
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  updateProduct = (req: Request, res: Response) => {
    try {
      const { productId, updateProduct } = req.body;
      console.log(req.body);
      if (!productId) {
        logger.info(`missing productId`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      if (!updateProduct) {
        logger.info(`missing details to update`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const updatedProduct = this.service.updateProduct(
        productId,
        updateProduct
      );

      logger.info("product updated sucessfully");
      return res.status(200).json(updatedProduct);
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };
}
