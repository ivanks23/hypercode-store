import {
  NextRequest,
  NextResponse,
} from "next/server";

import { Payment } from "mercadopago";

import { mercadopago } from "@/lib/mercadopago";

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    console.log(
      "Webhook received:",
      body
    );

    if (
      body.type !== "payment"
    ) {
      return NextResponse.json({
        ignored: true,
      });
    }

    const paymentId =
      body.data.id;

    const paymentClient =
      new Payment(mercadopago);

    const payment =
      await paymentClient.get({
        id: paymentId,
      });

    console.log(
      "Payment info:",
      payment
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Webhook error",
      },
      {
        status: 500,
      }
    );
  }
}
