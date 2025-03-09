export type User = {
  _id?: string;
  isAdmin: boolean;
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
};

export type Appointment = {
  _id?: string;
  eventId: EventT["_id"];
  userId: User["_id"];
  date?: string;
  endDate?: string;
  status: "scheduled" | "confirmed" | "paid" | "canceled" | "commited";
};

export type SelectDateEvent = {
  start: Date;
  end: Date;
};
