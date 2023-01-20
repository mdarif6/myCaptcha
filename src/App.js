import "./App.css";
import SignupPage from "./components/pages/loginpage/SignupPage";
import { useTheme } from "./context/theme-context";

function App() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          theme === "light"
            ? "linear-gradient(to right, #fff68f, #e6a91d)"
            : "linear-gradient(to right,#05010D, #082c6c)",
      }}
    >
      <SignupPage />
    </div>
  );
}

export default App;
