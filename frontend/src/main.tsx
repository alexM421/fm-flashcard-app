import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { DataProvider } from "./contexts/DataProvider.tsx";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <DataProvider>
                <RouterProvider router={router} />
            </DataProvider>
        </AuthProvider>
    </StrictMode>,
);
