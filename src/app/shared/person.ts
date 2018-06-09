export class Person {
  key: string;

  constructor(
    public nameGiven: string = null,
    public nameFamily: string = null,
    public displayName: string = null,
    public birthdate: Date = null,
    public mediaMinutes: number = null,
    public iconReference: string = null,
  ) {}

  static copyPerson(params: object): Person {
    return new Person(
      params['nameGiven'],
      params['nameFamily'],
      params['displayName'],
      new Date(params['birthdate']),
      params['mediaMinutes'],
      params['iconReference'],
    );
  }
}
