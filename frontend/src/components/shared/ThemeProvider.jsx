import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-gray-100 dark:bg-[#121212] text-gray-900 dark:text-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
