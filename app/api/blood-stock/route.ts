import { BloodStockController } from "@/controllers/bloodStock.controller";
import { type NextRequest } from "next/server";

const controller = new BloodStockController();

export async function GET() {
  return controller.findAll();
}

export async function PUT(req: NextRequest) {
  return controller.update(req);
}
