

const useSessionStorage = (key: string, type: string) => {
  try {
    if(type === 'get') {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : '';
    } else if(type === 'set') {
      const setValue = (value: string) => {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
      return [setValue]
    } else {
      const removeValue = () => {
        window.sessionStorage.removeItem(key);
      }
      return [removeValue]
    }
  } catch (error) {
    console.log(error)
  }
}

export default useSessionStorage
