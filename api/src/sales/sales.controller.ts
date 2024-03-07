import { SalesService } from "./sales.service";
import { Request, Response } from "express";
import { logger } from "../../winston/logger";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class SaleController {
  service: SalesService;

  constructor(service: SalesService) {
    this.service = service;
  }

  findById = (req: Request, res: Response) => {
    try {
      const { saleId } = req.params;

      if (!saleId) {
        logger.info(`Error finding the product`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const sale = this.service.findById(saleId);

      if (sale === null) {
        logger.info(`Error finding the sale`);
        return res.status(StatusCodes.NOT_FOUND).json({
          message: getReasonPhrase(StatusCodes.NOT_FOUND),
        });
      }
      return res.status(200).json(sale);
    } catch (error) {
      logger.error(`Error finding id from the method: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  findAll = (_req: Request, res: Response) => {
    try {
      const sales = this.service.findAll();
      return res.status(200).json(sales);
    } catch (error) {
      logger.error(`cant resolve the method: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  createSale = (req: Request, res: Response) => {
    try {
      const product = req.body;

      console.log(req.body);

      if (!product) {
        logger.info(`missing product details`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const newProduct = this.service.createSale(product);

      logger.info("Sale created Successfully");
      return res.status(200).json(newProduct);
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  deleteSale = (req: Request, res: Response) => {
    try {
      const { saleId } = req.body;
      console.log(req.body);
      if (!saleId) {
        logger.info(`missing saleId`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      this.service.deleteSale(saleId);

      logger.info("SALE deleted sucessfully");
      return res.status(200).json({ message: "SALE deleted sucessfully" });
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  updateSale = (req: Request, res: Response) => {
    try {
      const { saleId, updateSale } = req.body;

      if (!saleId) {
        logger.info(`missing saleId`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      if (!updateSale) {
        logger.info(`missing details to update`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const updatedProduct = this.service.updateSale(saleId, updateSale);

      logger.info("sale updated sucessfully");
      return res.status(200).json(updatedProduct);
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };
}
