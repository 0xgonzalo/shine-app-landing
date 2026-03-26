import { NextResponse } from "next/server";
import mailchimp from "@/lib/mailchimp";
import { subscribeSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input. Please check your name and email." },
        { status: 400 }
      );
    }

    const { name, email } = result.data;
    const listId = process.env.MAILCHIMP_LIST_ID!;

    await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed" as const,
      merge_fields: {
        FNAME: name,
      },
    });

    return NextResponse.json({ success: true, message: "Successfully subscribed" });
  } catch (error: unknown) {
    const mailchimpError = error as { status?: number; response?: { body?: { title?: string } } };

    if (mailchimpError.status === 400 && mailchimpError.response?.body?.title === "Member Exists") {
      return NextResponse.json(
        { success: false, error: "You're already subscribed! We'll keep you updated." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
