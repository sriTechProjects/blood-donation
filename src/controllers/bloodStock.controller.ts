import { BloodStockService } from "@/services/bloodStock.service";
import { NextResponse } from "next/server";

const bloodStockService = new BloodStockService();

export class BloodStockController {
  async findAll() {
    try {
      const stock = await bloodStockService.listStock();
      return NextResponse.json(stock);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 500 });
    }
  }

  async update(req: Request) {
    try {
      const body = await req.json();
      const { bloodType, volume } = body;

      if (typeof bloodType !== "string" || typeof volume !== "number") {
        return NextResponse.json(
          { message: "Invalid input: bloodType must be a string and volume must be a number." },
          { status: 400 },
        );
      }

      const updatedStock = await bloodStockService.updateStockLevel(
        bloodType,
        volume,
      );
      return NextResponse.json(updatedStock);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ message }, { status: 400 });
    }
  }
}
