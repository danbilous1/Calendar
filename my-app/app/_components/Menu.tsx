"use client";

import { useEffect, useState } from "react";

function Menu({
  showMenu,
}: {
  showMenu: {
    create_event: boolean;
    edit_event: boolean;
    create_appointment: boolean;
    edit_appointment: boolean;
  };
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(!!Object.values(showMenu).filter(Boolean).length);
  }, [showMenu]);

  return open ? (
    <div className="absolute top-[200px] left-[200px] bg-gray-200">
      {showMenu.edit_event && <button>Edit Event</button>}
      {showMenu.create_event && <button>Create Event</button>}
      {showMenu.edit_appointment && <button>Edit Appointment</button>}
      {showMenu.create_appointment && <button>Create Appointment</button>}
    </div>
  ) : null;
}

export default Menu;

can u style this with bootstrap;

i want it to be something like this:
    <Modal onClose={onClose}>
      <form
        onSubmit={handleCreate}
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
          Create Event
        </button>
      </form>
    </Modal>
