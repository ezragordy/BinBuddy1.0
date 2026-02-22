import { useEffect } from 'react';
import { router } from 'expo-router';

export default function LogIndex() {
  useEffect(() => {
    router.replace('/log/category');
  }, []);
  return null;
}
