class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    
   
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
     
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}

// Testing Example
const cache = new LRUCache(2);
cache.put("A", 10);
cache.put("B", 20);
console.log(cache.get("A")); // Output: 10
cache.put("C", 30);
console.log(cache.get("B")); // Output: -1
console.log(cache.get("C")); // Output: 30
console.log(cache.get("A")); // Output: 10