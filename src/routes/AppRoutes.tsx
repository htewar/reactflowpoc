import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Template as TemplatePage } from "../pages";
import { Header } from "../components";

const AppRoutes = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" element={<TemplatePage />} />
        </Routes>
    </Router>
}

export default AppRoutes;