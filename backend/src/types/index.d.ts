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

  interface RequestValidate {
    body?: ZodTypeAny;
    query?: ZodTypeAny;
    params?: ZodTypeAny;
  }

  type Roles = "admin" | "student" | "teacher";

  interface FindAllOptions {
    skip: number;
    limit: number;
    search?: string | undefined;
    sortBy: "createdAt" | "email" | "name";
    order: "asc" | "desc";
  }
}

export {};
