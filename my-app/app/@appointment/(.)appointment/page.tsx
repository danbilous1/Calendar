"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Appointment } from "../../type";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import dateFormator from "@/app/lib/dateFormator";

function CreateAppointment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventId");
  const date = searchParams.get("date");
  const endDate = searchParams.get("endDate");

  const [appointment, setAppointment] = useState<Partial<Appointment>>({
    status: "scheduled",
    eventId: eventId || "",
    notes: "",
  });

  useEffect(() => {
    if (eventId && date && endDate) {
      setAppointment((prev) => ({
        ...(prev || {}),
        eventId,
        date: dateFormator(new Date(+date)),
        endDate: dateFormator(new Date(+endDate)),
      }));
    }
  }, [eventId, date, endDate]); // create new useeffect what will listen to appointment id search param and fetch current appointment data from mongo and will populate form

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/appointment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.log(result.error);
          return;
        }
        router.back();
      });
  };

  return (
    <Modal
      onClose={() => {
        router.back();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className=" p-4 border rounded shadow-lg bg-white"
      >
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Appointment Date:
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="date"
            name="date"
            value={appointment.date || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Appointment End Date:
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="endDate"
            name="endDate"
            value={appointment.endDate || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes:
          </label>
          <input
            type="text"
            className="form-control"
            id="notes"
            name="notes"
            value={appointment.notes || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Create Appointment
        </button>
      </form>
    </Modal>
  );
}

export default CreateAppointment;
