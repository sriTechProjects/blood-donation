// src/repositories/donor.repository.ts
import { prisma } from "@/lib/prisma";
import type { Donor } from "@prisma/client";

export class DonorRepository {
  async createDonor(data: Omit<Donor, "id">): Promise<Donor> {
    return prisma.donor.create({ data });
  }

  async getDonorById(id: number): Promise<Donor | null> {
    return prisma.donor.findUnique({ where: { id } });
  }

  async getDonorByEmail(email: string): Promise<Donor | null> {
    return prisma.donor.findUnique({ where: { email } });
  }

  async getAllDonors(): Promise<Donor[]> {
    return prisma.donor.findMany();
  }

  async updateDonor(id: number, data: Partial<Donor>): Promise<Donor> {
    return prisma.donor.update({
      where: { id },
      data,
    });
  }

  async deleteDonor(id: number): Promise<Donor> {
    return prisma.donor.delete({ where: { id } });
  }
}
