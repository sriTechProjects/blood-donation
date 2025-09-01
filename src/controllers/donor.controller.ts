// src/controllers/donor.controller.ts
import { DonorService } from "@/services/donor.service";
import { NextResponse } from "next/server";

const donorService = new DonorService();

export class DonorController {
  async create(req: Request) {
    try {
      const body = await req.json();
      const donor = await donorService.registerDonor(body);
      return NextResponse.json(donor, { status: 201 });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 400 });
    }
  }

  async findOne(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
      const donor = await donorService.findDonorById(id);
      if (!donor) {
        return NextResponse.json({ message: "Donor not found" }, { status: 404 });
      }
      return NextResponse.json(donor);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
  }

  async findAll() {
    try {
        const donors = await donorService.listDonors();
        return NextResponse.json(donors);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
  }

  async update(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
      const body = await req.json();
      const donor = await donorService.updateDonorDetails(id, body);
      return NextResponse.json(donor);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
  }

  async remove(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
      const donor = await donorService.removeDonor(id);
      return NextResponse.json(donor); // Or return a 204: new NextResponse(null, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
  }
}