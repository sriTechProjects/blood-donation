import { RequestRepository } from "@/repositories/request.repository";
import { BloodStockRepository } from "@/repositories/bloodStock.repository";
import { prisma } from "@/lib/prisma";
import type { Request, Recipient } from "@prisma/client";

const requestRepository = new RequestRepository();
const bloodStockRepository = new BloodStockRepository();

export class RequestService {
  async submitRequest(
    requestData: Omit<Request, "id" | "recipientId" | "date" | "status">,
    recipientData: Omit<Recipient, "id">,
  ): Promise<Request> {
    return requestRepository.createRequestWithRecipient(
      requestData,
      recipientData,
    );
  }

  async listAllRequests(): Promise<Request[]> {
    return requestRepository.getAllRequests();
  }

  async updateRequestStatus(
    requestId: number,
    newStatus: "fulfilled" | "rejected",
  ): Promise<Request> {
    if (newStatus === "rejected") {
      return requestRepository.updateRequestStatus(requestId, newStatus);
    }

    // newStatus === 'fulfilled'
    const request = await requestRepository.getRequestById(requestId);
    if (!request) {
      throw new Error("Request not found");
    }

    return prisma.$transaction(async (tx) => {
      // 1. Decrement blood stock
      const stock = await tx.bloodStock.findUnique({
        where: { bloodType: request.bloodType },
      });

      if (!stock || stock.volume < request.volume) {
        throw new Error("Insufficient blood stock");
      }

      await tx.bloodStock.update({
        where: { bloodType: request.bloodType },
        data: { volume: { decrement: request.volume } },
      });

      // 2. Update request status
      const updatedRequest = await tx.request.update({
        where: { id: requestId },
        data: { status: "fulfilled" },
      });

      return updatedRequest;
    });
  }
}
