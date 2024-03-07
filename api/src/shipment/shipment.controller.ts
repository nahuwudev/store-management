import { ShipmentService } from "./shipment.service";
import { Request, Response } from "express";
import { logger } from "../../winston/logger";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ShipmentController {
  service: ShipmentService;

  constructor(service: ShipmentService) {
    this.service = service;
  }

  findById = (req: Request, res: Response) => {
    try {
      const { shipmentId } = req.params;

      if (!shipmentId) {
        logger.info(`Error finding the shipment`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const sale = this.service.findById(shipmentId);

      if (sale === null) {
        logger.info(`Error finding the shipment`);
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

      if (!product) {
        logger.info(`missing shipment details`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const newProduct = this.service.createShipment(product);

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
      const { shipmentId } = req.body;

      if (!shipmentId) {
        logger.info(`missing productId`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      this.service.deleteShipment(shipmentId);

      logger.info("product deleted sucessfully");
      return res.status(200).json({ message: "shipment deleted sucessfully" });
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  updateSale = (req: Request, res: Response) => {
    try {
      const { shipmentId, shipmentUpdate } = req.body;

      if (!shipmentId) {
        logger.info(`missing shipmentId`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      if (!shipmentUpdate) {
        logger.info(`missing details to update`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const updatedProduct = this.service.updateShipment(
        shipmentId,
        shipmentUpdate
      );

      logger.info("shipment updated sucessfully");
      return res.status(200).json(updatedProduct);
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };
}
