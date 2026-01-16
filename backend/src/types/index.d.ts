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
}

export {};
