export async function uploadImage(file) {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "styles_bazar");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/gtvdutcc/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  return result.secure_url;
}