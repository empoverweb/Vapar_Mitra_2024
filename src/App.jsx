import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<Navigate to="/auth/sign-in"/>} />
      <Route path="/login" element={<Navigate to="/auth/sign-in"/>} />
    </Routes>
  );
}

export default App;
