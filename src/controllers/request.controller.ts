import { RequestService } from "@/services/request.service";
import { NextResponse } from "next/server";

const requestService = new RequestService();

export class RequestController {
  async create(req: Request) {
    try {
      const body = await req.json();
      // Assuming body contains { requestData, recipientData }
      const { requestData, recipientData } = body;
      const newRequest = await requestService.submitRequest(
        requestData,
        recipientData,
      );
      return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 400 });
    }
  }

  async findAll() {
    try {
      const requests = await requestService.listAllRequests();
      return NextResponse.json(requests);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 500 });
    }
  }

  async updateStatus(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
      }

      const body = await req.json();
      const { status } = body;

      if (status !== "fulfilled" && status !== "rejected") {
        return NextResponse.json(
          { message: "Invalid status provided." },
          { status: 400 },
        );
      }

      const updatedRequest = await requestService.updateRequestStatus(
        id,
        status,
      );
      return NextResponse.json(updatedRequest);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      // Handle specific errors like "Insufficient blood stock"
      if (message.includes("Insufficient") || message.includes("not found")) {
        return NextResponse.json({ message }, { status: 400 });
      }
      return NextResponse.json({ message }, { status: 500 });
    }
  }
}
