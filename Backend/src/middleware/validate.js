export const validate = (schema) => {
  return (req, res, next) => {
    // When multer runs first, req.body has text fields but image is in req.file
    // Merge them so Zod sees the full picture
    const dataToValidate = {
      ...req.body,
      ...(req.file ? { image: req.file } : {}),
    };

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({ success: false, errors });
    }

    req.body = result.data;
    next();
  };
};