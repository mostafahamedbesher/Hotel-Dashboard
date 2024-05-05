import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins cannot be loaded!");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabin cannot be deleted!");
  }
}

export async function createEditCabin(cabinData, id) {
  // use this variable to check creating or editing a cabin
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit cabin
  let query = supabase.from("cabins");
  // A) create
  if (!id) {
    query = query.insert([{ ...cabinData, image: imagePath }]);
  }

  // B) edit
  if (id) {
    query = query.update({ ...cabinData, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(id ? "cabin cannot be Edited!" : "cabin cannot be Added!");
  }

  // if image didnot edited(no need to upload it again)
  if (hasImagePath) return data;

  // 2. upload cabin image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);

  // Delete the cabin if was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabin image could not be uploaded! and the cabin cannot be created"
    );
  }

  return data;
}
