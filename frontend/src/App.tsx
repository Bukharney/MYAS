import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import TermsAndConditions from "./pages/t&c";
import { SearchBarProvider } from "./provider/SearchBarProvider";
import NotFound from "./pages/404";
import { ThemeProvider } from "./provider/theme-provider";

function App() {
  return (
    <SearchBarProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/t&c" element={<TermsAndConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </SearchBarProvider>
  );
}

export default App;
