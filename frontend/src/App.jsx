import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./Components";
import { About, Budget, Expense, SignIn } from "./Pages";

function App() {
  // Remove bg-primary and text-secondary classes from the <div>
  return (
    <div className="px-5 pt-28 min-h-screen font-inter"> 
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