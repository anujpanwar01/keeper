import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchCard = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const value = { searchValue, setSearchValue };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const ThemeContext = createContext({
  theme: true,
  setTheme: () => true,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const value = { theme, setTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
