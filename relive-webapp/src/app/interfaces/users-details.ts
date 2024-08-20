export interface User {
    CustomerID: number;
    LoginID : number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    CardID: string;
    JoinDate: Date;
    startingWeight: number; // not strictly needed
    BirthdayDate: Date;
    height: number; // not strictly needed
    Email: string;
    Sex: string;
    Athlete: boolean;
    DefaultLang: string
  }