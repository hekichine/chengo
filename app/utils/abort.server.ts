import { json } from "@remix-run/node";

type StatusCode = 400 | 401 | 403 | 404 | 500;

interface ErrorResponse {
  message?: string;
  status: StatusCode;
}

export function abort(status: StatusCode, message?: string) {
  const errors: Record<StatusCode, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error"
  };

  throw json<ErrorResponse>(
    { 
      message: message || errors[status],
      status 
    }, 
    { status }
  );
}