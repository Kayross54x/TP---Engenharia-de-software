"use client";

import { User } from '@prisma/client';
import React, { useState } from 'react'

export interface UserContextType {
    userLogged: User | null;
    setUserLogged: (user: User | null) => void;
}

export const UserContext = React.createContext<UserContextType>({});

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
	const [userLogged, setUserLogged] = useState<any>(null);
	return (
		<UserContext.Provider value={{ userLogged, setUserLogged }}>
			{children}
		</UserContext.Provider>
	)
}
