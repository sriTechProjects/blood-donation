// src/controllers/donor.controller.ts
import { DonorService } from "@/services/donor.service";
import { createDonorSchema, updateDonorSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const donorService = new DonorService();

export class DonorController {
  async create(req: Request) {
    try {
      const body = await req.json();
      const validation = createDonorSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { message: "Invalid input", errors: validation.error.errors },
          { status: 400 },
        );
      }
      const donor = await donorService.registerDonor(validation.data);
      return NextResponse.json(donor, { status: 201 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return NextResponse.json(
            { message: "Email already exists" },
            { status: 409 },
          );
        }
      }
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 400 });
    }
  }

  async findOne(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
      }
      const donor = await donorService.findDonorById(id);
      if (!donor) {
        return NextResponse.json(
          { message: "Donor not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(donor);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 500 });
    }
  }

  async findAll(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);

      if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return NextResponse.json(
          { message: "Invalid pagination parameters" },
          { status: 400 },
        );
      }

      const donors = await donorService.listDonors(page, limit);
      return NextResponse.json(donors);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 500 });
    }
  }

  async update(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
      }
      const body = await req.json();
      const validation = updateDonorSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { message: "Invalid input", errors: validation.error.errors },
          { status: 400 },
        );
      }
      const donor = await donorService.updateDonorDetails(id, validation.data);
      return NextResponse.json(donor);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return NextResponse.json(
            { message: "Donor not found" },
            { status: 404 },
          );
        }
      }
      if (error instanceof Error && error.message.includes("email already exists")) {
        return NextResponse.json({ message: error.message }, { status: 409 });
      }
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 500 });
    }
  }

  async remove(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
      }
      const donor = await donorService.removeDonor(id);
      return NextResponse.json(donor);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return NextResponse.json(
            { message: "Donor not found" },
            { status: 404 },
          );
        }
      }
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 500 });
    }
  }
}