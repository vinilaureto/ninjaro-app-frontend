import { Outlet, useNavigate } from "react-router";
import { useSessionContext } from "../../context/session-context";
import { Toaster } from "sonner";

const AuthLayout = () => {
	const { session, updateSession } = useSessionContext();
	const navigate = useNavigate();

	if (!session) {
		updateSession().then((success) => {
			if (!success) {
				navigate("/login");
			}
		});
	}

	return <Outlet />;
};

export const ProtectedRoutes = () => (
	<>
		<AuthLayout />
		<Toaster />
	</>
);
