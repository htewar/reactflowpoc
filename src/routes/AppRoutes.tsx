import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Template as TemplatePage } from "../pages";

const AppRoutes = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<TemplatePage />} />
        </Routes>
    </Router>
}

export default AppRoutes;