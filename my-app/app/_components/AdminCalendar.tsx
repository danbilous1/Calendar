// A business side admin dashboard for businesses to manage available appointment times and future appointments.
"use client";
import { FC, useEffect, useState } from "react";
import AppointmentCart from "@/app/_components/AppointmentCart";
import Image from "next/image";
import { Calendar, momentLocalizer, SlotInfo, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEvent from "@/app/_components/CreateEvent";
import { EventT, PickCalendarEvent, SelectDateEvent } from "@/app/type";
import { useRouter } from "next/navigation";
const localizer = momentLocalizer(moment);

const AdminCalendar: FC<{
  events: Event[];
  appointments: Event[];
  isAdmin: boolean;
}> = ({ events, appointments, isAdmin }) => {
  console.log("admin calendar rendered");
  const router = useRouter();

  const [showEventForm, setShowEventForm] = useState(false);
  const [datePayload, setDatePayload] = useState<SelectDateEvent | null>(null);
  function handleSelectTime(payload: SelectDateEvent) {
    setShowEventForm(true);
    console.log(1, payload);
    setDatePayload(payload);
  }
  function handleSelectEvent(payload: unknown) {
    console.log(2, payload);
    setShowEventForm(false);
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
      <h1>{isAdmin ? "Admin View" : "User View"}</h1>
      <Calendar
        dayLayoutAlgorithm={"no-overlap"}
        onSelectSlot={isAdmin ? handleSelectTime : () => {}}
        onSelectEvent={handleSelectEvent}
        localizer={localizer}
        backgroundEvents={events as unknown as Event[]}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
      />
      {showEventForm && datePayload && isAdmin && (
        <CreateEvent
          date={datePayload.start}
          endDate={datePayload.end}
          onClose={() => {
            setShowEventForm(false);
          }}
        />
      )}
    </div>
  );
};
export default AdminCalendar;
