
import { apiRequest } from "../Services/Api.js";

export const uploadImage = async (eventId, file) => {
  if (!eventId) {
    throw new Error("Event ID is missing.");
  }

  if (!file) {
    throw new Error("Please select an image.");
  }

  const formData = new FormData();
  formData.append("poster", file);

  const response = await apiRequest(`/events/${eventId}/poster`, {
    method: "POST",
    body: formData,
  });

  return response.poster_url;
};
