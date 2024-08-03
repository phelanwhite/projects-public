export function handleResponse(res, { status, message, result }) {
  return res.status(status).json({
    status,
    message,
    result,
  });
}
export const handleError = async (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  return handleResponse(res, { status, message, result: null });
};
