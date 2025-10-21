import { supabase } from '@/lib/supabase/supabase';

type UploadImageType = {
  uri: string;
  userId: string;
};

export const uploadImage = async ({ uri, userId }: UploadImageType) => {
  const filePath = `profile-pictures/${userId}.jpg`;
  const response = await fetch(uri);
  const blob = await response.blob();

  try {
    const { error, data } = await supabase.storage
      .from('images')
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    return data.path;
  } catch (error) {
    throw error;
  }
};
