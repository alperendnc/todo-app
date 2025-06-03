import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeModeContext = createContext<{
  mode: "dark" | "light";
  toggleMode: () => void;
}>({
  mode: "light",
  toggleMode: () => {},
});

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("themeMode");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
