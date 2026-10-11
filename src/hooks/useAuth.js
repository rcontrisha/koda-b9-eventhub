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
  // const { users } = useSelector((state) => state.userState);
  const { active: user } = useSelector((state) => state.activeState);

  const joinEvent = async (eventId) => {
    console.log(eventId);
    const url = `http://localhost:8080/events/${eventId}/toggle-join`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[Join Event]-Response: ", data);
      return data;
    } catch (error) {
      error.message;
    }
    // const updated = {
    //   ...user,
    //   joined_events: user.joined_events?.includes(eventId)
    //     ? user.joined_events
    //     : [...(user.joined_events ?? []), eventId],
    // };
    // console.log(updated);
    // if (updated) {
    //   dispatch(updateActiveUser(updated));
    //   dispatch(updateUser(updated));
    // }
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
      dispatch(updateUser(updated));
    }
  };

  const editProfile = (payload) => {
    console.log("isi payload", payload);
    const updated = {
      ...user,
      ...payload,
    };

    if (updated) {
      console.log("isi updated", updated);
      if (!Object.hasOwn(payload, "password")) {
        console.log("tes");
        dispatch(updateActiveUser(updated));
      }
      dispatch(updateUser(updated));
    }
  };

  const hasJoinedEvent = (eventId) =>
    user?.user?.joined_events?.map((e) => e.id).includes(eventId) || false;
  const hasSavedEvent = (eventId) =>
    user?.user?.saved_events?.map((e) => e.id).includes(eventId) || false;
  const hasJoinedCommunity = (communityId) =>
    user?.user?.joined_communities?.map((c) => c.id).includes(communityId) ||
    false;

  return {
    user: user?.user,
    role: user?.user.role ?? null,
    editProfile,
    joinEvent,
    saveEvent,
    hasSavedEvent,
    joinCommunity,
    hasJoinedEvent,
    hasJoinedCommunity,
  };
}
