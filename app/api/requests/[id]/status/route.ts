import { RequestController } from "@/controllers/request.controller";
import { type NextRequest } from "next/server";

const controller = new RequestController();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return controller.updateStatus(req, { params });
}
