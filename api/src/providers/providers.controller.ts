import { ProviderService } from "./providers.service";
import { Request, Response } from "express";
import { logger } from "../../winston/logger";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ProviderController {
  service: ProviderService;

  constructor(service: ProviderService) {
    this.service = service;
  }

  findById = (req: Request, res: Response) => {
    try {
      const { providerId } = req.params;

      if (!providerId) {
        logger.info(`Error finding the provider`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const sale = this.service.findById(providerId);

      if (sale === null) {
        logger.info(`Error finding the provider`);
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

  createProvider = (req: Request, res: Response) => {
    try {
      const provider = req.body;

      if (!provider) {
        logger.info(`missing provider details`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const newProduct = this.service.createProvider(provider);

      logger.info("Provider created Successfully");
      return res.status(200).json(newProduct);
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  deleteProvider = (req: Request, res: Response) => {
    try {
      const { providerId } = req.body;

      if (!providerId) {
        logger.info(`missing providerId`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      this.service.deleteProvider(providerId);

      logger.info("provider deleted sucessfully");
      return res.status(200).json({ message: "product deleted sucessfully" });
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };

  updateProvider = (req: Request, res: Response) => {
    try {
      const { providerId, updatedProvider } = req.body;

      if (!providerId) {
        logger.info(`missing providerId`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      if (!updatedProvider) {
        logger.info(`missing details to update`);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
      }

      const updatedProduct = this.service.updateProvider(
        providerId,
        updatedProvider
      );

      logger.info("Provider updated sucessfully");
      return res.status(200).json(updatedProduct);
    } catch (error) {
      logger.error(`can't resolve: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };
}
