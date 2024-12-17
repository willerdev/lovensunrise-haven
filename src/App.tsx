import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProcurationIndex from "@/pages/procuration/Index";
import ProcurationForm from "@/pages/procuration/Form";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/procuration" element={<ProcurationIndex />} />
        <Route path="/procuration/form" element={<ProcurationForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
