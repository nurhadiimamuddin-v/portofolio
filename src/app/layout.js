import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://nurhadiimamuddin.com"),
  title: "Nur Hadi Imamuddin | Software Engineer",
  description:
    "Nur Hadi Imamuddin — Software Engineer based in East Java. Building robust, user-centric systems from full-stack web applications to IoT integrations.",
  openGraph: {
    title: "Nur Hadi Imamuddin | Software Engineer",
    description:
      "Software Engineer crafting digital experiences with deep logic, sleek aesthetics, and scalable architectures.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
