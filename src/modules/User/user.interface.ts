export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordUpdatedAt?: Date | null;
  role: "user" | "admin";
  status: "blocked" | "unblocked";
}
