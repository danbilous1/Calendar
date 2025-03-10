"use client";
import { useEffect, useState } from "react";
import AppointmentCart from "./_components/AppointmentCart";
import Image from "next/image";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEvent from "./_components/CreateEvent";
import { EventT, PickCalendarEvent, SelectDateEvent } from "./type";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState<PickCalendarEvent[]>([]);
  useEffect(() => {
    fetch("/api/event")
      .then((res) => res.json())
      .then((result: EventT[]) => {
        const bigCalendarEvent = result.map((event) => ({
          id: event._id,
          title: event.description,
          start: new Date(event.date),
          end: new Date(event.endDate),
        }));
        setEvents(bigCalendarEvent);
      });
  }, []);

  const [showEventForm, setShowEventForm] = useState(false);
  const [datePayload, setDatePayload] = useState<SelectDateEvent | null>(null);
  function handleSelectTime(payload: SelectDateEvent) {
    setShowEventForm(true);
    console.log(payload);
    setDatePayload(payload);
  }

  return (
    <div>
      <Calendar
        onSelectSlot={handleSelectTime}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
      />
      {showEventForm && datePayload && (
        <CreateEvent date={datePayload.start} endDate={datePayload.end} />
      )}
    </div>
  );
};
export default MyCalendar;
