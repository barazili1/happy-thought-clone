import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Script | Advanced Analytics" },
      {
        name: "description",
        content:
          "Advanced analytics terminal for Apple and Crash game predictions with real-time signal grids.",
      },
      { property: "og:title", content: "Smart Script | Advanced Analytics" },
      {
        property: "og:description",
        content:
          "Advanced analytics terminal for Apple and Crash game predictions with real-time signal grids.",
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
