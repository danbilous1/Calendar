// A business side admin dashboard for businesses to manage available appointment times and future appointments.
"use client";
import { FC, memo, useEffect, useMemo, useState } from "react";
import AppointmentCart from "@/app/_components/AppointmentCart";
import Image from "next/image";
import { Calendar, momentLocalizer, SlotInfo, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEvent from "@/app/_components/CreateEvent";
import { EventT, PickCalendarEvent, SelectDateEvent } from "@/app/type";
import { useRouter } from "next/navigation";

const UserCalendar: FC<{ events: Event[]; appointments: Event[] }> = ({
  events,
  appointments,
}) => {
  console.log("user calendar rendered", events.length, appointments.length);
  const router = useRouter();
  const localizer = useMemo(() => momentLocalizer(moment), []);
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
  return (
    <div>
      <h1>User View</h1>
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

export default UserCalendar;
