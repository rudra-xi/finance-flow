import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./Components";
import { About, Budget, Expense, SignIn } from "./Pages";

function App() {
  return (
    <div className="bg-primary px-5 pt-28 text-secondary min-h-screen font-inter">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
