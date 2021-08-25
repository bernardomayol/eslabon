export interface IUser {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  displayName: string;
  isActive: boolean;
  genero: number;
  dateCreated: Date;
}

export interface IUserCreate {
  email: string;
  password: string;
  displayName: string;
  genero: number;
}
