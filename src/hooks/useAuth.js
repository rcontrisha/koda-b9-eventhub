import { useState } from "react";

function readUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function readUser() {
  const email = localStorage.getItem("active");
  if (!email) return null;
  return readUsers().find((u) => u.email === email) || null;
}

function updateActiveUser(updater) {
  const email = localStorage.getItem("active");
  if (!email) return null;
  const users = readUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) return null;
  users[idx] = updater(users[idx]);
  localStorage.setItem("users", JSON.stringify(users));
  return users[idx];
}

export function useAuth() {
  const [user, setUser] = useState(readUser);

  const login = (email) => {
    localStorage.setItem("active", email);
    setUser(readUser());
  };
  const logout = () => {
    localStorage.removeItem("active");
    setUser(null);
  };

  const joinEvent = (eventId) => {
    const updated = updateActiveUser((u) => ({
      ...u,
      joined_events: u.joined_events?.includes(eventId)
        ? u.joined_events
        : [...(u.joined_events ?? []), eventId],
    }));
    if (updated) setUser(updated);
  };

  const saveEvent = (eventId) => {
    const updated = updateActiveUser((u) => ({
      ...u,
      saved_events: u.saved_events?.includes(eventId)
        ? u.saved_events.filter((id) => id !== eventId)
        : [...(u.saved_events ?? []), eventId],
    }));
    if (updated) setUser(updated);
  };

  const joinCommunity = (communityId) => {
    const updated = updateActiveUser((u) => ({
      ...u,
      joined_communities: u.joined_communities?.includes(communityId)
        ? u.joined_communities
        : [...(u.joined_communities ?? []), communityId],
    }));
    if (updated) setUser(updated);
  };

  const hasJoinedEvent = (eventId) =>
    user?.joined_events?.includes(eventId) ?? false;
  const hasSavedEvent = (eventId) =>
    user?.saved_events?.includes(eventId) ?? false;
  const hasJoinedCommunity = (communityId) =>
    user?.joined_communities?.includes(communityId) ?? false;

  return {
    user,
    isGuest: !user,
    isAttendee: !!user,
    login,
    logout,
    joinEvent,
    saveEvent,
    hasSavedEvent,
    joinCommunity,
    hasJoinedEvent,
    hasJoinedCommunity,
  };
}
