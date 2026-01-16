declare global {
  type ErrorDetails = {
    field?: string;
    message?: string;
  };

  type ErrorType = {
    type?: string;
    details?: ErrorDetails[];
  };

  type Errorresponse = string | ErrorType;

  interface AuthUser {
    userId: string;
    role: "admin" | "student" | "teacher";
  }
}

export {};
