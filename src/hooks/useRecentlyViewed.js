import useLocalStorage from './useLocalStorage';

const MAX_ITEMS = 8;

// Tracks the last few products a shopper viewed, most recent first
export default function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useLocalStorage('recentlyViewed', []);

  const addRecentlyViewed = (id) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  return { recentIds, addRecentlyViewed };
}
