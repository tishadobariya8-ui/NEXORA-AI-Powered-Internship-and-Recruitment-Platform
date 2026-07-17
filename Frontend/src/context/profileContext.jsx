import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "./useAuth";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {

    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const refreshProfile = async () => {

        if (!user?.email) {
            setProfile(null);
            setLoading(false);
            return;
        }

        try {

            const response = await API.get(
                "/api/profile/me",
                {
                    params: {
                        email: user.email
                    }
                }
            );
            setProfile(response.data);
        }

        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        refreshProfile();

    }, [user]);

    return (

        <ProfileContext.Provider

            value={{
                profile,
                loading,
                refreshProfile,
                setProfile
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    return useContext(ProfileContext);
}