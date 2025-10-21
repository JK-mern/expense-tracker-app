import { supabase } from '@/lib/supabase/supabase';
import { AuthSchemaType } from '@/schemas/auth';

export const regisetUser = async ({ email, password }: AuthSchemaType) => {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'myapp://login'
    }
  });

  if (error) throw new Error(error.message);
  return true;
};

export const verifyOtp = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup'
  });
  if (error) throw new Error(error.message);
  return data;
};
