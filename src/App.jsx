import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">

      <Sidebar />

      <main className="min-h-screen lg:ml-72">
        <div className="p-8">

          <p className="text-sm font-semibold text-[#9b333b]">
            College Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#292321]">
            Student Management Portal
          </h1>

        </div>
      </main>

    </div>
  );
}

export default App;