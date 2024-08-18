import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import TermsAndConditions from "./pages/t&c";
import { SearchBarProvider } from "./provider/searchBarProvider";
import NotFound from "./pages/404";
import { ThemeProvider } from "@/provider/themeProvider";
import { AssignmentsProvider } from "./provider/assignmentsProvider";

function App() {
  return (
    <SearchBarProvider>
      <ThemeProvider>
        <AssignmentsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/t&c" element={<TermsAndConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AssignmentsProvider>
      </ThemeProvider>
    </SearchBarProvider>
  );
}

export default App;
