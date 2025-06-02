"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateEvent from "./CreateEvent";
import CreateAppointment from "../@appointment/(.)appointment/page";

function Menu({
  showMenu,
}: {
  showMenu: {
    create_event: (() => void) | false;
    edit_event: (() => void) | false;
    create_appointment: (() => void) | false;
    edit_appointment: (() => void) | false;
  };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!Object.values(showMenu).filter(Boolean).length);
  }, [showMenu]);
  return open ? (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={() => setOpen(false)}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div>
              {!!showMenu.create_event && (
                <button
                  className="btn btn-light w-100 mb-2"
                  onClick={() => {
                    showMenu.create_event && showMenu.create_event();
                    setOpen(false);
                  }}
                >
                  Create Event
                </button>
              )}
              {!!showMenu.edit_event && (
                <button
                  className="btn btn-light w-100 mb-2"
                  onClick={showMenu.edit_event}
                >
                  Edit Event
                </button>
              )}
              {!!showMenu.create_appointment && (
                <button
                  className="btn btn-light w-100 mb-2"
                  onClick={showMenu.create_appointment}
                >
                  Create Appointment
                </button>
              )}
              {!!showMenu.edit_appointment && (
                <button
                  className="btn btn-light w-100 mb-2"
                  onClick={showMenu.edit_appointment}
                >
                  Edit Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Menu;
