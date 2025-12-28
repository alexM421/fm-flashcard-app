import { createBrowserRouter, Navigate } from "react-router-dom"
import App from "./App"
import StudyMode from "./pages/StudyMode/StudyMode"
import AllCards from "./pages/AllCards/AllCards"

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
        { index: true, element: <Navigate to="/study-mode" replace /> },
        { path: "/study-mode", element: <StudyMode /> },
        { path: "/all-cards", element: <AllCards /> }
    ]
}])