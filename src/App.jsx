import { Routes, Route } from "react-router";

import AuthLayout from "./layouts/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPassword from "./components/auth/ForgotPassword";

import Event from "./pages/Event";
import MainLayout from "./layouts/MainLayout";
import Explore from "./pages/Explore";
import Communities from "./pages/Communities";
import EventDetail from "./pages/EventDetail";
import CommunityDetailLayout from "./layouts/CommunityDetailLayout";
import CommunityEvents from "./pages/community-detail/CommunityEvents";
import CommunityMember from "./pages/community-detail/CommunityMember";
import CommunityDiscussion from "./pages/community-detail/CommunityDiscussion";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/explore" element={<Explore />} />
        <Route path="/events">
          <Route index element={<Event />} />
          <Route path=":slug" element={<EventDetail />}/>
        </Route>
        <Route path="/communities">
          <Route index element={<Communities />} />
          <Route path=":slug" element={<CommunityDetailLayout />}>
            <Route index element={<CommunityEvents />} />
            <Route path="members" element={<CommunityMember />} />
            <Route path="discussion" element={<CommunityDiscussion />} />
          </Route>
        </Route>
      </Route>
      
    </Routes>
  );
}
