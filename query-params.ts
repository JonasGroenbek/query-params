interface QueryArgs {
  [key: string]:
    | string
    | string[]
    | number
    | number[]
    | Date
    | boolean
    | undefined;
}

export const queryParamBuilder = (params: QueryArgs) => {
  let queryParams = "";
  if (params === undefined) {
    return queryParams;
  } else {
    const entries = Object.entries(params);
    let started = false;
    entries.forEach((keyValue, i) => {
      const key = keyValue[0];
      const value = keyValue[1];
      if (
        value === undefined ||
        (typeof value === "number" && isNaN(value)) ||
        value === null
      ) {
        return;
      }
      if (!started) {
        queryParams += "?";
        started = true;
      }

      if (Array.isArray(value)) {
        value.forEach((e, i) => {
          e = String(e);
          queryParams += `${key}=${e}${i !== e.length - 1 ? "&" : ""}`;
        });
      } else if (value !== undefined && value !== "") {
        if (value instanceof Date) {
          queryParams += `${key}=${value.toISOString().substring(0, 10)}`;
        } else {
          queryParams += `${key}=${value.toString()}`;
        }
      }
      if (
        entries[i + 1] !== undefined &&
        entries[i + 1][1] !== undefined &&
        entries[i + 1][1] !== ""
      ) {
        queryParams += "&";
      }
    });
  }
  return queryParams;
};
