export const Sucess = (message: string, data: any, status: number) => {
  return {
    error: false,
    status,
    data,
    message,
  };
};
export const apiError = (message: string, status: number) => {
  return {
    error: true,
    status,
    data: {},
    message,
  };
};
