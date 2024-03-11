import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, UserManagment, Masters, Coupons, Promotions, Stocks, Reports ,EKycBypassApproval} from "@/layouts";
import { SignIn, SignUp } from "./pages/auth";
import { ProtectedRoute } from "./pages/auth/protected-route";


function App() {
  return (
    <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/auth/sign-up" element={<SignUp />} />
    <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} />} />
    <Route path="/usermanagement/*"  element={<ProtectedRoute element={<UserManagment />} />} />
    <Route path="/masters/*"  element={<ProtectedRoute element={<Masters />} />} />
    <Route path="/coupons/*"  element={<ProtectedRoute element={<Coupons />} />} />
    <Route path="/promotions/*" element={<ProtectedRoute element={<Promotions />} />} />
    <Route path="/stocks/*"  element={<ProtectedRoute element={<Stocks />} />} />  
    <Route path="/eKycBypassApproval/*"  element={<ProtectedRoute element={<EKycBypassApproval />} />} />  
    </Routes>
  );
}

export default App;
