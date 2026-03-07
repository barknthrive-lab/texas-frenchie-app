"use client";

import { useEffect, useState } from "react";

// Helper function needed to subscribe with VAPID keys
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      console.log("Service Worker registered successfully", registration.scope);

      // Check for existing subscription
      const sub = await registration.pushManager.getSubscription();
      if (sub) {
        setSubscription(sub);
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicVapidKey) {
        throw new Error("Missing VAPID public key");
      }

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      setSubscription(sub);

      // Send to server to save in Database
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });

    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
    }
  }

  // Auto-hide the entire UI if push isn't natively supported (e.g., iOS without PWA installed)
  if (!isSupported) {
    return null;
  }

  // If they are already subscribed, we hide it to keep UI clean, or show a subtle 'Alerts Active'
  if (subscription) {
    return (
      <div className="fixed bottom-4 right-4 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-xs font-mono tracking-widest bg-opacity-80 backdrop-blur-sm z-50">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
        ALERTS ACTIVE
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-[#E8500A] p-4 text-white shadow-2xl z-50 rounded-xl max-w-xs animate-in slide-in-from-bottom border border-white/10">
      <div className="flex flex-col gap-2">
        <h3 className="font-bebas tracking-wider text-xl">Get Emergency Alerts</h3>
        <p className="text-xs leading-5 font-sans opacity-90 mb-2">
          Download the app manually by clicking &quot;Add to Home Screen&quot;. Enable alerts for real-time Texas heat warnings and local theft reports.
        </p>
        <button
          onClick={subscribeToPush}
          className="bg-black hover:bg-zinc-900 text-white font-mono text-[10px] uppercase tracking-widest py-3 px-4 rounded w-full transition-colors"
        >
          Enable Push Alerts
        </button>
      </div>
    </div>
  );
}
