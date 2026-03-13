export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Format the errors into a clean { field: "message" } object
      const errors = result.error.errors.reduce((acc, err) => {
        const field = String(err.path[0] ?? "general");
        acc[field] = err.message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Attach the validated (clean) data to req.body
    req.body = result.data;
    next();
  };
};