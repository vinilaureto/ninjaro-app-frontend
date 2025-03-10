import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { SessionContextProvider } from "./context/session-context.tsx";
import "./index.css";
import { ProtectedRoutes } from "./components/auth/protected-routes.tsx";
import DashboardPage from "./pages/private/dashboard.tsx";
import LoginPage from "./pages/public/login.tsx";
import SignupPage from "./pages/public/signup.tsx";
import SelectTeamPage from "./pages/private/team.tsx";
import LinkPage from "./pages/private/link-page.tsx";
import LinksPage from "./pages/private/links-page.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SessionContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route element={<ProtectedRoutes />}>
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/teams" element={<SelectTeamPage />} />
						<Route path="/links" element={<LinksPage />} />
						<Route path="/links/new" element={<LinkPage />} />
						<Route path="/links/:id" element={<LinkPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</SessionContextProvider>
	</StrictMode>
);
