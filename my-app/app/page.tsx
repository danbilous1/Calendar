"use server";
import { Event } from "react-big-calendar";
import { Appointment, EventT } from "./type";
import AdminCalendar from "./_components/AdminCalendar";
import { getevents } from "@/app/actions/getevents";
import { headers } from "next/headers";

const MyCalendar = async () => {
  const headersObject = await headers();
  const userId = headersObject.get("userId");
  const { events, isAdmin, appointments } = await getevents(userId).then(
    ([eventsList, isAdmin]) => {
      let appointments: Event[] = [];
      const events = eventsList.map((event) => {
        if (event?.appointments?.length) {
          appointments.push(
            ...(event?.appointments?.map((appointment) => ({
              id: appointment._id,
              event_id: event._id,
              title: "appointment " + event.description + appointment.status,
              start: new Date(appointment.date || event.date),
              end: new Date(appointment.endDate || event.endDate),
              type: "appointment",
            })) || [])
          );
        }
        return {
          id: event._id,
          title: "event " + event.description,
          start: new Date(event.date),
          end: new Date(event.endDate),
          type: "event",
        };
      });
      return {
        events,
        isAdmin: isAdmin,
        appointments,
      };
    }
  );

  return (
    <div>
      <AdminCalendar
        events={events}
        appointments={appointments}
        isAdmin={isAdmin}
      />
    </div>
  );
};
export default MyCalendar;
