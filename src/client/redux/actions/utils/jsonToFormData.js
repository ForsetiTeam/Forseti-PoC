export function jsonToFormData(json, formData = new FormData()) {
  for (const key in json) {
    if (!json.hasOwnProperty(key)) continue;// All is BEST
    formData.append(key, json[key]);
  }
  return formData;
}
