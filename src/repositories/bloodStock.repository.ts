import { prisma } from "@/lib/prisma";
import type { BloodStock } from "@prisma/client";

export class BloodStockRepository {
  async getAllStock(): Promise<BloodStock[]> {
    return prisma.bloodStock.findMany({
      orderBy: {
        bloodType: "asc",
      },
    });
  }

  async updateStock(
    bloodType: string,
    volume: number,
  ): Promise<BloodStock> {
    return prisma.bloodStock.upsert({
      where: { bloodType },
      update: { volume },
      create: { bloodType, volume },
    });
  }
}
