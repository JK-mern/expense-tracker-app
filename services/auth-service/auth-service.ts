import { supabase } from '@/lib/supabase/supabase';
import { AuthSchemaType, Login } from '@/schemas/auth';
import { router } from 'expo-router';

const redirectTo = 'expense-tracker://reset-password';

export const regisetUser = async ({ email, password }: AuthSchemaType) => {
  const { error } = await supabase.auth.signUp({
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

export const signInWithEmail = async ({ email, password }: Login) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error?.code === 'invalid_credentials') {
    return false;
  }

  if (error?.code === 'email_not_confirmed') {
    await supabase.auth.resend({
      email: email,
      type: 'signup'
    });
    router.push({
      pathname: '/(auth)/verify',
      params: { email: email }
    });
    return;
  }

  if (error) throw new Error(error.message);
  return true;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error('Failed to signout user');
  }
};

export const requestResetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo
  });
  if (error) {
    throw new Error('Failed to request reset password url');
  }
};
