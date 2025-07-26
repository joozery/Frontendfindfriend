import React, { createContext, useState, useContext, useEffect } from 'react';
import { activities as initialActivities } from '@/data/activities';

const ActivityContext = createContext();

export const useActivities = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState(() => {
    try {
      const savedActivities = localStorage.getItem('activities');
      return savedActivities ? JSON.parse(savedActivities) : initialActivities;
    } catch (error) {
      console.error("Failed to parse activities from localStorage", error);
      return initialActivities;
    }
  });

  const [bookedActivityIds, setBookedActivityIds] = useState(() => {
     try {
      const savedBookedIds = localStorage.getItem('bookedActivityIds');
      return savedBookedIds ? JSON.parse(savedBookedIds) : [];
    } catch (error) {
      console.error("Failed to parse booked IDs from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('bookedActivityIds', JSON.stringify(bookedActivityIds));
  }, [bookedActivityIds]);

  const bookActivity = (activityId) => {
    if (bookedActivityIds.includes(activityId)) return false;

    setActivities(prevActivities =>
      prevActivities.map(activity => {
        if (activity.id === activityId && activity.participants < activity.maxParticipants) {
          return { ...activity, participants: activity.participants + 1 };
        }
        return activity;
      })
    );
    setBookedActivityIds(prevIds => [...prevIds, activityId]);
    return true;
  };

  const cancelBooking = (activityId) => {
    if (!bookedActivityIds.includes(activityId)) return false;

    setActivities(prevActivities =>
      prevActivities.map(activity => {
        if (activity.id === activityId) {
          return { ...activity, participants: Math.max(0, activity.participants - 1) };
        }
        return activity;
      })
    );
    setBookedActivityIds(prevIds => prevIds.filter(id => id !== activityId));
    return true;
  };

  const addActivity = (newActivity) => {
    const activityWithId = { ...newActivity, id: Date.now(), participants: 0 };
    setActivities(prevActivities => [activityWithId, ...prevActivities]);
  };

  const value = {
    activities,
    bookedActivityIds,
    bookActivity,
    cancelBooking,
    addActivity
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};