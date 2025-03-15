import Ajv, { Schema } from "ajv";

const ajv = new Ajv();
export const ValidateRequest = (requestInput: unknown, schema: Schema) => {
  const validatedData = ajv.compile(schema);
  if (validatedData(requestInput)) {
    return false;
  }
  const errors = validatedData.errors?.map((error) => error.message);

  return errors && errors[0];
};
