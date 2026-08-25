import { useDispatch, useSelector } from "react-redux";

import { updateActiveUser } from "../redux/slices/LoginSlice";
import { updateUser } from "../redux/slices/RegisterSlice";

// function readUsers() {
//   return JSON.parse(localStorage.getItem("users") || "[]");
// }

// function readUser() {
//   const email = localStorage.getItem("active");
//   if (!email) return null;
//   const user = readUsers().find((u) => u.email === email);
//   if (!user) return null;
//   return { ...user, role: user.role ?? "attendee" };
// }

// function updateActiveUser(updater) {
//   const email = localStorage.getItem("active");
//   if (!email) return null;
//   const users = readUsers();
//   const idx = users.findIndex((u) => u.email === email);
//   if (idx === -1) return null;
//   users[idx] = updater(users[idx]);
//   localStorage.setItem("users", JSON.stringify(users));
//   return users[idx];
// }

export function useAuth() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userState);
  const { active: user } = useSelector((state) => state.activeState);

  const joinEvent = (eventId) => {
    console.log(eventId);
    const updated = {
      ...user,
      joined_events: user.joined_events?.includes(eventId)
        ? user.joined_events
        : [...(user.joined_events ?? []), eventId],
    };
    console.log(updated);
    if (updated) {
      dispatch(updateActiveUser(updated));
      dispatch(updateUser(updated))
    }
  };

  const saveEvent = (eventId) => {
    const updated = {
      ...user,
      saved_events: user.saved_events?.includes(eventId)
        ? user.saved_events.filter((id) => id !== eventId)
        : [...(user.saved_events ?? []), eventId],
    };
    if (updated) {
      dispatch(updateActiveUser(updated));
      dispatch(updateUser(updated));
      console.log(updated);
    }
  };

  const joinCommunity = (communityId) => {
    const updated = {
      ...user,
      joined_communities: user.joined_communities?.includes(communityId)
        ? user.joined_communities
        : [...(user.joined_communities ?? []), communityId],
    };
    if (updated) {
      dispatch(updateActiveUser(updated));
      dispatch(updateUser(updated))
    }
  };

  const hasJoinedEvent = (eventId) =>
    user?.joined_events?.includes(eventId) || false;
  const hasSavedEvent = (eventId) =>
    user?.saved_events?.includes(eventId) || false;
  const hasJoinedCommunity = (communityId) =>
    user?.joined_communities?.includes(communityId) || false;

  return {
    user,
    role: user?.role ?? null,
    isGuest: !user?.role,
    isAttendee: user?.role === "attendee",
    joinEvent,
    saveEvent,
    hasSavedEvent,
    joinCommunity,
    hasJoinedEvent,
    hasJoinedCommunity,
  };
}
