import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DRAGON VIP | Advanced Analytics" },
      {
        name: "description",
        content:
          "DRAGON VIP analytics terminal for Apple and Crash game predictions with real-time signal grids.",
      },
      { property: "og:title", content: "DRAGON VIP | Advanced Analytics" },
      {
        property: "og:description",
        content:
          "DRAGON VIP analytics terminal for Apple and Crash game predictions with real-time signal grids.",
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
