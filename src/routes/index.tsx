import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EAGLE VIP | Advanced Analytics" },
      {
        name: "description",
        content:
          "EAGLE VIP analytics terminal for Apple and Crash game predictions with real-time signal grids.",
      },
      { property: "og:title", content: "EAGLE VIP | Advanced Analytics" },
      {
        property: "og:description",
        content:
          "EAGLE VIP analytics terminal for Apple and Crash game predictions with real-time signal grids.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ClientOnly fallback={<div className="min-h-screen bg-black" />}>{<App />}</ClientOnly>;
}
