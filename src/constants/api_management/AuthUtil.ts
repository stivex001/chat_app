const AUTH_TOKEN_KEY = "token";
const AUTH_ADMIN_KEY = "adminData";

type RoleType = {
  _id: string;
  name: string;
};

export type AdminAuthType = {
  activation_code: string | null;
  activation_expires_in: string | null;
  createdAt: string;
  email: string;
  firebase_uid: string | null;
  first_name: string;
  id: string;
  isDeleted: boolean;
  isSuspended: boolean;
  is_active: boolean;
  last_name: string;
  notification_counter: number;
  phone: string;
  profile_picture: string;
  role: RoleType[];
  updatedAt: string;
  _id: string;
};

export const AuthUtils = {
  // Get the auth token
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  },

  // Get the user data
  getAdminData: (): AdminAuthType | null => {
    if (typeof window !== "undefined") {
      const adminData = localStorage.getItem(AUTH_ADMIN_KEY);
      return adminData ? (JSON.parse(adminData) as AdminAuthType) : null;
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return false;
  },

  // Log out user (clear auth data)
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_ADMIN_KEY);
    }
  },

  // Store auth data (token and user info)
  setAuthData: (token: string, adminData: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_ADMIN_KEY, JSON.stringify(adminData));
    }
  },
};
