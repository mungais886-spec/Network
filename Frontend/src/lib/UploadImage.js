
export const uploadImage = async (file) => {
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body }
  );

  if (!res.ok) throw new Error("Poster upload failed. Try again.");

  const data = await res.json();
  return data.secure_url;
};
