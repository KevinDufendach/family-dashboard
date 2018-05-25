export class MediaDay {
  id: string;
  events: MediaEvent[];

  constructor(id: string) {}
}

export class MediaEvent {
  value_change: number;
  description: string;
  child_id: string;
}

export class MediaChild {
  id: string;
  name: string;
  default_minutes: number;
}
