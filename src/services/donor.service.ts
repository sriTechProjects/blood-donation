// src/services/donor.service.ts
import { DonorRepository } from "@/repos/donor.repository";
import type { Donor } from "@prisma/client";

const donorRepository = new DonorRepository();

export class DonorService {
  async registerDonor(data: Omit<Donor, "id">): Promise<Donor> {
    const existingDonor = await donorRepository.getDonorByEmail(data.email);
    if (existingDonor) {
      throw new Error("A donor with this email already exists.");
    }
    return donorRepository.createDonor(data);
  }

  async findDonorById(id: number): Promise<Donor | null> {
    return donorRepository.getDonorById(id);
  }

  async listDonors(page: number, limit: number): Promise<Donor[]> {
    return donorRepository.getAllDonors(page, limit);
  }

  async updateDonorDetails(id: number, data: Partial<Donor>): Promise<Donor> {
    if (data.email) {
      const existingDonor = await donorRepository.getDonorByEmail(data.email);
      if (existingDonor && existingDonor.id !== id) {
        throw new Error("A donor with this email already exists.");
      }
    }
    return donorRepository.updateDonor(id, data);
  }

  async removeDonor(id: number): Promise<Donor> {
    return donorRepository.deleteDonor(id);
  }
}