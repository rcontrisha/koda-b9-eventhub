import { Routes, Route } from "react-router";

import AuthLayout from "./components/auth/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPassword from "./components/auth/ForgotPassword";

import Event from "./pages/Event";
import GuestLayout from "./components/GuestLayout";
import Explore from "./pages/Explore";
import Communities from "./pages/Communities";
import EventDetail from "./pages/EventDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<GuestLayout />}>
        <Route path="/explore" element={<Explore />} />
        <Route path="/events">
          <Route index element={<Event />} />
          {/* <Route path=":slug" element={<EventDetail />}/> */}
        </Route>
        <Route path="/event-detail" element={<EventDetail />} />
        <Route path="/communities" element={<Communities />} />
      </Route>
      
    </Routes>
  );
}
