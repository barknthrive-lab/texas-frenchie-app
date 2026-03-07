import { NextResponse } from "next/server";
import webpush from "web-push";
import { supabase } from "@/lib/supabaseClient";

// Setup web-push configured with VAPID keys
webpush.setVapidDetails(
  "mailto:contact@petshealthessentials.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
  process.env.VAPID_PRIVATE_KEY as string
);

export async function POST(request: Request) {
  try {
    const { title, body, url } = await request.json();

    // 1. Fetch all active subscriptions from Supabase
    const { data: subscriptions, error } = await supabase
      .from("push_subscriptions")
      .select("*");

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "DB Error" }, { status: 500 });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ message: "No subscribers found." });
    }

    // 2. Loop through and send notifications
    const payload = JSON.stringify({
      title: title || "Texas Frenchie Alert",
      body: body || "New update available.",
      url: url || "/",
    });

    const sendPromises = subscriptions.map((sub) => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      return webpush
        .sendNotification(pushSubscription, payload)
        .catch(async (err) => {
          console.error("Error sending push to endpoint:", sub.endpoint, err);
          
          // Auto-cleanup invalid subscriptions (410 is 'Gone' or unsubscribed)
          if (err.statusCode === 410 || err.statusCode === 404) {
            await supabase
              .from("push_subscriptions")
              .delete()
              .eq("endpoint", sub.endpoint);
          }
        });
    });

    await Promise.all(sendPromises);

    return NextResponse.json({
      success: true,
      sentTo: subscriptions.length,
    });
  } catch (error) {
    console.error("Failed to send push notification", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
