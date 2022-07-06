import { Routes, Route } from "react-router-dom";
import { Footer } from "../components/ui/Footer";
import { Home } from "../pages/Home";
import Menu from "../components/ui/Menu";
import Exercise1 from "../pages/Exercise1";
import Exercise2 from "../pages/Exercise2";

const App = () => {
  return (
    <>
      <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="exercise1" element={<Exercise1 />} />
          <Route path="exercise2" element={<Exercise2 />} />
        </Routes>
      <Footer />

    </>
  );
};

export default App;