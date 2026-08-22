import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Sidebar />

      <div className="lg:ml-72">
        <Header />

        <main className="p-4 md:p-8">
          <p className="text-sm font-semibold text-[#9b333b]">
            College Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#292321]">
            Student Management Portal
          </h1>
        </main>
      </div>
    </div>
  );
}

export default App;