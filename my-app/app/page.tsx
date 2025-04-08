"use client";
import { useEffect, useState } from "react";
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

const localizer = momentLocalizer(moment);
type ResultT = { events: EventT[]; isAdmin: boolean };

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [appointments, setAppointments] = useState<Event[]>([]);
  const router = useRouter();
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
  function handleSelectEvent(payload: unknown) {
    console.log(2, payload);
    if (
      typeof payload == "object" &&
      payload !== null &&
      "id" in payload &&
      "start" in payload &&
      "end" in payload &&
      payload.start instanceof Date &&
      payload.end instanceof Date
    ) {
      router.push(
        `/appointment?eventId=${
          payload.id
        }&date=${payload.start.getTime()}&endDate=${payload.end.getTime()}`
      );
    }
  }
  console.log(events, appointments);

  return (
    <div>
      <Calendar
        dayLayoutAlgorithm={"no-overlap"}
        onSelectEvent={handleSelectEvent}
        localizer={localizer}
        backgroundEvents={events as unknown as Event[]}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
      />
    </div>
  );
};
export default MyCalendar;
