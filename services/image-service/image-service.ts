import { supabase } from '@/lib/supabase/supabase';

type UploadImageType = {
  uri: string;
  userId: string;
};

export const uploadImage = async ({ uri, userId }: UploadImageType) => {
  const filePath = `profile-pictures/${userId}.jpg`;
  const response = await fetch(uri);
  const arrayBuffer = await response.arrayBuffer();

  try {
    const { error, data } = await supabase.storage
      .from('images')
      .upload(filePath, arrayBuffer, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    return data.path;
  } catch (error) {
    throw error;
  }
};

export const getImageUrl = async (path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .createSignedUrl(path, 300);
    if (error) throw error;

    return data.signedUrl;
  } catch (error) {
    throw error;
  }
};
