export type User = {
  _id?: string;
  isAdmin: boolean;
  name: string;
  email: string;
  password: string;
};

export type EventT = {
  _id?: string;
  creatorId: User["_id"];
  date: string;
  endDate: string;
  type: string;
  description: string;
  schedule?: object;
  capacity: number;
  appointments?: Appointment[];
};

export type Appointment = {
  _id?: string;
  eventId: EventT["_id"];
  userId: User["_id"];
  date?: string;
  endDate?: string;
  status: "scheduled" | "confirmed" | "paid" | "canceled" | "commited";
  notes?: string;
};

export type SelectDateEvent = {
  start: Date;
  end: Date;
};

export type PickCalendarEvent = {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};
