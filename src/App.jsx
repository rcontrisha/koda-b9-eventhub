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
import MyEventsLayout from "./layouts/MyEventsLayout";
import UpcomingEvents from "./pages/my-events/UpcomingEvents";
import PastEvents from "./pages/my-events/PastEvents";
import SavedEvents from "./pages/my-events/SavedEvents";
import RequireAuth from "./components/shared/RequireAuth";

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
        <Route element={<RequireAuth />}>
          <Route path="/my-events" element={<MyEventsLayout />}>
            <Route index element={<UpcomingEvents />} />
            <Route path="past" element={<PastEvents />} />
            <Route path="saved" element={<SavedEvents />} />
          </Route>
        </Route>
      </Route>
      
    </Routes>
  );
}
