import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background pokemon-bg ">
      <div className="min-h-screen dark:bg-black/20 bg-white/20  backdrop-blur">
        {" "}
        <Header />
        <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-[2000px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
