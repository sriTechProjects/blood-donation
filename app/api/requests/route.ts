import { RequestController } from "@/controllers/request.controller";
import { type NextRequest } from "next/server";

const controller = new RequestController();

export async function GET() {
  return controller.findAll();
}

export async function POST(req: NextRequest) {
  return controller.create(req);
}
