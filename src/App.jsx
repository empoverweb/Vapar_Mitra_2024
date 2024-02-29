import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard,UserManagment,Masters,Coupons,Promotions,Stocks,Reports} from "@/layouts";  
import { SignIn , SignUp} from "./pages/auth";

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
    </Routes>
  );
}

export default App;
