// app/api/donors/[id]/route.ts
import { DonorController } from "@/controllers/donor.controller";

const donorController = new DonorController();

// GET a single donor
export async function GET(req: Request, { params }: { params: { id: string } }) {
  return donorController.findOne(req, { params });
}

// UPDATE a donor
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return donorController.update(req, { params });
}

// DELETE a donor
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return donorController.remove(req, { params });
}