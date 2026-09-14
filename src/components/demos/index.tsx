"use client";

import type { Project } from "@/data/projects";
import AfriFlowDemo from "./AfriFlowDemo";
import DrwintechDemo from "./DrwintechDemo";
import EventsDemo from "./EventsDemo";
import KoraBudgetDemo from "./KoraBudgetDemo";
import MediLinkDemo from "./MediLinkDemo";
import PresenceDemo from "./PresenceDemo";
import SpeedGoDemo from "./SpeedGoDemo";

const registry = {
  afriflow: AfriFlowDemo,
  korabudget: KoraBudgetDemo,
  medilink: MediLinkDemo,
  presence: PresenceDemo,
  events: EventsDemo,
  speedgo: SpeedGoDemo,
  drwintech: DrwintechDemo,
};

export default function ProjectDemo({ id }: { id: NonNullable<Project["demoComponent"]> }) {
  const Demo = registry[id];
  return <Demo />;
}
