import { prisma } from "@/lib/prisma";
import type { Prisma, Request, Recipient } from "@prisma/client";

export class RequestRepository {
  async getAllRequests(): Promise<Request[]> {
    return prisma.request.findMany({
      include: {
        recipient: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  }

  async getRequestById(id: number): Promise<Request | null> {
    return prisma.request.findUnique({
      where: { id },
    });
  }

  async createRequestWithRecipient(
    requestData: Omit<Request, "id" | "recipientId" | "date" | "status">,
    recipientData: Omit<Recipient, "id">,
  ): Promise<Request> {
    return prisma.request.create({
      data: {
        ...requestData,
        recipient: {
          create: recipientData,
        },
      },
    });
  }

  async updateRequestStatus(
    id: number,
    status: string,
  ): Promise<Request> {
    return prisma.request.update({
      where: { id },
      data: { status },
    });
  }
}
