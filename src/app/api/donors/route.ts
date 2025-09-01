// app/api/donors/route.ts
import { DonorController } from "@/controllers/donor.controller";

const donorController = new DonorController();

// GET all donors
export async function GET() {
  return donorController.findAll();
}

// POST a new donor
export async function POST(req: Request) {
  return donorController.create(req);
}