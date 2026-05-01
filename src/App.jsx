import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import {
  LiderPage,
  TezOkuuPage,
  JetiTepkichPage,
  EnglishPage,
  RussianPage,

} from "./coursePages";

<Route path="/courses/lider" element={<LiderPage />} />

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/courses/lider" element={<LiderPage />} />
        <Route path="/courses/lider"       element={<LiderPage />} />
        <Route path="/courses/tez-okuu"    element={<TezOkuuPage />} />
        <Route path="/courses/jeti-tepkich" element={<JetiTepkichPage />} />
        <Route path="/courses/english"     element={<EnglishPage />} />
        <Route path="/courses/russian"     element={<RussianPage />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
