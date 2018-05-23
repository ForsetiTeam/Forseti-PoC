export function jsonToFormData(json, formData = new FormData()) {
  for (const key in json) {
    if (!json.hasOwnProperty(key)) continue;
    const value = json[key];

    if (value === null || value === undefined) continue;
    formData.append(key, value);
  }
  return formData;
}
