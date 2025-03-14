"use client";

import Link from "next/link";
import { useState } from "react";
import CreateEvent from "./CreateEvent";
import Image from "next/image";

export default function Navigation() {
  const [showEventForm, setShowEventForm] = useState(false);
  return (
    <nav>
      <Image src="/image286.jpg" width={150} height={150} alt="red photo" />
      <Link href="/">Home</Link>
      <Link href="/appointment">Create Appointment</Link>
      <Link href="/">Home</Link>
      <button
        onClick={() => {
          setShowEventForm(!showEventForm);
        }}
      >
        Show
      </button>
      {showEventForm && <CreateEvent />}
    </nav>
  );
}
