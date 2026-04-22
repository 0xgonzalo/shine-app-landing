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
    const mailchimpError = error as {
      status?: number;
      response?: { body?: { title?: string; detail?: string } };
    };

    const title = mailchimpError.response?.body?.title;
    const detail = mailchimpError.response?.body?.detail;

    console.error("[/api/subscribe] Mailchimp error", {
      status: mailchimpError.status,
      title,
      detail,
    });

    if (mailchimpError.status === 400 && title === "Member Exists") {
      return NextResponse.json(
        { success: false, error: "You're already subscribed! We'll keep you updated." },
        { status: 409 }
      );
    }

    if (mailchimpError.status === 400 && title === "Invalid Resource") {
      return NextResponse.json(
        {
          success: false,
          error:
            detail ?? "That email address looks invalid. Please use a real email.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
