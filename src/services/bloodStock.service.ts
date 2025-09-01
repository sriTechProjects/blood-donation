import { BloodStockRepository } from "@/repositories/bloodStock.repository";
import type { BloodStock } from "@prisma/client";

const bloodStockRepository = new BloodStockRepository();

export class BloodStockService {
  async listStock(): Promise<BloodStock[]> {
    return bloodStockRepository.getAllStock();
  }

  async updateStockLevel(
    bloodType: string,
    volume: number,
  ): Promise<BloodStock> {
    if (!bloodType) {
      throw new Error("Blood type cannot be empty.");
    }
    if (volume < 0) {
      throw new Error("Volume cannot be negative.");
    }
    return bloodStockRepository.updateStock(bloodType, volume);
  }
}
