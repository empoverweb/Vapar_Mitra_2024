import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard,UserManagment,Masters,Coupons,Promotions,Stocks,Reports, EKycBypassApproval} from "@/layouts";  
import { SignIn , SignUp} from "./pages/auth";
import Retailers from "./layouts/retailers";
//import EKycBypassApproval from "./layouts/eKycBypassApproval";

function App() {
  return (
    <Routes> 
      <Route path="/" element={<SignIn />} /> 
      <Route path="/auth/sign-up" element={<SignUp />} />  
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/usermanagement/*" element={<UserManagment/>} />
      <Route path="/masters/*" element={<Masters/>} />
      <Route path="/coupons/*" element={<Coupons/>} />
      <Route path="/promotions/*" element={<Promotions/>} />  
      <Route path="/stocks/*" element={<Stocks/>} />  
      <Route path="/reports/*" element={<Reports/>} /> 
      <Route path="/eKycBypassApproval/*" element={<EKycBypassApproval/>} /> 
      <Route path="/retailers/*" element={<Retailers/>} /> 
    </Routes>
  );
}

export default App;
