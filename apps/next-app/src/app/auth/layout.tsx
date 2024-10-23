export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <section style={{ textAlign: "center", padding: "2rem" }}>
          {children}
        </section>
      </main>
    </div>
  );
}
