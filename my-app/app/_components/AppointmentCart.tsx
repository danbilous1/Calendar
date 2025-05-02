import { Appointment } from "../type";

function AppointmentCart({ appointment }: { appointment: Appointment }) {
  return (
    <div className="appointment-cart">
      <p>Status: {appointment.status}</p>
    </div>
  );
}

export default AppointmentCart;
