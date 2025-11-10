export function saveToSession(key: string, value: any) {
    if (value === undefined) return;
    sessionStorage.setItem(key, JSON.stringify(value));
}
  
export function loadFromSession<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    if (!item || item === 'undefined') return null;
    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
}