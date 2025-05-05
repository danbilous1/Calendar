"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Modal";
import { EventT } from "../type";
import "bootstrap/dist/css/bootstrap.min.css";
import dateFormator from "../lib/dateFormator";
import { Event } from "react-big-calendar";

function CreateEvent({
  date,
  endDate,
  onClose,
  selectEvent,
}: {
  date?: Date;
  endDate?: Date;
  onClose: () => void;
  selectEvent?: Event;
}) {
  const router = useRouter();

  const [event, setEvent] = useState<Partial<EventT>>({});

  useEffect(() => {
    if (selectEvent) {
      setEvent((prevevent) => ({
        ...prevevent,
        description: selectEvent.title as string,
        date: dateFormator(selectEvent.start!),
        endDate: dateFormator(selectEvent.end!),
      }));
    } else if (date && endDate) {
      setEvent({
        ...event,
        date: dateFormator(date),
        endDate: dateFormator(endDate),
      });
    }
  }, [date, endDate, selectEvent]);

  useEffect(() => {}, [selectEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (e: React.FormEvent) => {};

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/event", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.log(result.error);
          return;
        }
        router.push("/");
      });
  };

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={selectEvent ? handleEdit : handleCreate}
        className=" p-4 border rounded shadow-lg bg-white"
      >
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Event Date:
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="date"
            name="date"
            value={event.date || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            Event End Date:
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="endDate"
            name="endDate"
            value={event.endDate || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={event.description || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={event.type || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="capacity" className="form-label">
            Capacity
          </label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            name="capacity"
            value={event.capacity || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {selectEvent ? "Update Event" : "Create Event"}
        </button>
      </form>
    </Modal>
  );
}

export default CreateEvent;
