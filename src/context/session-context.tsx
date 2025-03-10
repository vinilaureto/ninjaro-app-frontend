import { createContext, useContext, useState, ReactNode } from "react";

type Session = {
	user: {
		id: string;
		email: string;
		name: string;
	};
	team: {
		id: string;
		name: string;
	};
};

interface sessionContextType {
	session: Session | null;
	updateSession: () => Promise<boolean>;
}

const SessionContext = createContext<sessionContextType | undefined>(undefined);

export const SessionContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [session, setSession] = useState<Session | null>(null);

	async function updateSession() {
		const data = await fetchSessionData();
		if (data.success) {
			setSession(data.session!);
			return true;
		}

		return false;
	}

	return (
		<SessionContext.Provider value={{ session, updateSession }}>
			{children}
		</SessionContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSessionContext = () => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppContextProvider");
	}
	return context;
};

// Support functions
type SessionData = {
	success: boolean;
	session?: Session;
};

async function fetchSessionData(): Promise<SessionData> {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/v1/sessions/me`,
		{
			credentials: "include",
		}
	);

	if (response.ok) {
		const data = await response.json();
		return data;
	}

	return {
		success: false,
	};
}
