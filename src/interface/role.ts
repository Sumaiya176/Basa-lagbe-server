const USER_ROLE = {
  user: "user",
  admin: "admin",
  superAdmin: "superAdmin",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
