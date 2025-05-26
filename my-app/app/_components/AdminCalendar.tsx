// A business and user side
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
import Menu from "./Menu";
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
  const [selectEvent, setSelectEvent] = useState<Event | null>(null);
  const [showMenu, setShowMenu] = useState<{
    create_event: (() => void) | false;
    edit_event: (() => void) | false;
    create_appointment: (() => void) | false;
    edit_appointment: (() => void) | false;
  }>({
    create_event: false,
    edit_event: false,
    create_appointment: false,
    edit_appointment: false,
  });
  function handleSelectTime(payload: SelectDateEvent) {
    // setShowEventForm(true);
    setShowMenu(() => ({
      edit_event: false,
      create_appointment: false,
      edit_appointment: false,
      create_event: () => {
        setShowEventForm(true);
        setShowMenu({
          create_event: false,
          edit_event: false,
          create_appointment: false,
          edit_appointment: false,
        });
      },
    }));
    console.log(1, payload);
    setDatePayload(payload);
  }
  function handleSelectEvent(payload: unknown) {
    console.log(2, payload);
    // setShowEventForm(false);
    if (
      typeof payload == "object" &&
      payload !== null &&
      "id" in payload &&
      "start" in payload &&
      "end" in payload &&
      payload.start instanceof Date &&
      payload.end instanceof Date &&
      "isBackgroundEvent" in payload &&
      payload.isBackgroundEvent
    ) {
      setShowMenu((prev) => ({
        ...prev,
        edit_event: () => {
          setSelectEvent(payload);
          setShowEventForm(true);
          setShowMenu({
            create_event: false,
            edit_event: false,
            create_appointment: false,
            edit_appointment: false,
          });
        },
        create_appointment: () => {
          setShowMenu({
            create_event: false,
            edit_event: false,
            create_appointment: false,
            edit_appointment: false,
          });
          router.push(
            `/appointment?eventId=${
              payload.id
            }&date=${payload.start.getTime()}&endDate=${payload.end.getTime()}`
          );
        },
        edit_appointment: false,
      }));
    } else {
      setShowMenu((prev) => ({
        ...prev,
        edit_event: () => {
          const eventId = payload.event_id;
          const correctEvent = events.find((event) => {
            event.id == eventId;
          });
          if (correctEvent) {
            setSelectEvent(correctEvent);
          }
          setShowEventForm(true);
          setShowMenu({
            create_event: false,
            edit_event: false,
            create_appointment: false,
            edit_appointment: false,
          });
        },
        create_appointment: () => {
          setShowMenu({
            create_event: false,
            edit_event: false,
            create_appointment: false,
            edit_appointment: false,
          });
          router.push(
            `/appointment?eventId=${
              payload.event_id
            }&date=${payload.start.getTime()}&endDate=${payload.end.getTime()}`
          );
        },
        edit_appointment: () => {
          console.log(payload);
          setShowMenu({
            create_event: false,
            edit_event: false,
            create_appointment: false,
            edit_appointment: false,
          });
          router.push(`/appointment?appointmentId=${payload.id}`);
        },
      }));
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
          selectEvent={selectEvent}
        />
      )}
      <Menu showMenu={showMenu} />
    </div>
  );
};
export default AdminCalendar;
