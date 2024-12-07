// utils/toastify.ts
import { toast } from 'react-toastify';

export const toastify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
};