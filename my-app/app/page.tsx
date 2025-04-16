"use client";
import { useEffect, useMemo, useState } from "react";
import AppointmentCart from "./_components/AppointmentCart";
import Image from "next/image";
import { Calendar, momentLocalizer, SlotInfo, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEvent from "./_components/CreateEvent";
import { EventT, PickCalendarEvent, SelectDateEvent } from "./type";
import { useRouter } from "next/navigation";
import appointment from "./models/appointment";
import { Result } from "postcss";
import AdminCalendar from "./_components/AdminCalendar";
import UserCalendar from "./_components/UserCalendar";

type ResultT = { events: EventT[]; isAdmin: boolean };

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/event")
      .then((res) => res.json())
      .then((result: ResultT) => {
        setIsAdmin(result.isAdmin);
        const bigCalendarEvent = result.events.map((event) => {
          if (event?.appointments?.length) {
            setAppointments((prev) =>
              prev.concat(
                event?.appointments?.map((appointment) => ({
                  id: appointment._id,
                  title: event.description + appointment.status,
                  start: new Date(appointment.date || event.date),
                  end: new Date(appointment.endDate || event.endDate),
                })) || []
              )
            );
          }
          return {
            id: event._id,
            title: event.description,
            start: new Date(event.date),
            end: new Date(event.endDate),
          };
        });

        setEvents(bigCalendarEvent);
      });
  }, []);

  console.log(events, appointments);
  // if (isAdmin === null) {
  //   return <div>Loading..</div>;
  // }
  return (
    <div>
      {/* {isAdmin === null ? (
        <div>Loading..</div>
      ) : isAdmin ? ( */}
      <AdminCalendar
        events={events}
        appointments={appointments}
        isAdmin={isAdmin}
      />
      {/* ) : ( */}
      {/* <UserCalendar events={events} appointments={appointments} /> */}
      {/* )} */}
    </div>
  );
};
export default MyCalendar;
