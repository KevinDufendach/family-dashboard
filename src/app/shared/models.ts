export class MediaDay {
  events: MediaEvent[];
}

export class MediaEvent {
  // value_change: number;
  // description: string;
  // child_id: string;

  constructor(public child_id: string, public description: string, public value_change: number) {}
}

export class MediaChild {
  id: string;
  name: string;
  default_minutes: number;
}
