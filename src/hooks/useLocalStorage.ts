

const useLocalStorage = (key: string, type: string) => {
  try {
    if(type === 'get') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : '';
    } else if(type === 'set') {
      const setValue = (value: string) => {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
      return [setValue]
    } else {
      const removeValue = () => {
        window.localStorage.removeItem(key);
      }
      return [removeValue]
    }
  } catch (error) {
    console.log(error)
  }
}

export default useLocalStorage
