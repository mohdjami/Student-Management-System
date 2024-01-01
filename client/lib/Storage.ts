export const handleStorageChange = (setIsLoggedIn: (arg0: boolean) => void) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  setIsLoggedIn(Boolean(token));
};
