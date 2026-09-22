# ⚡ Least Recently Used (LRU) Cache Implementation

A high-performance implementation of a **Least Recently Used (LRU) Cache** in JavaScript designed to perform `get()` and `put()` operations in **$O(1)$ average time complexity**.

---

## 📌 Project Overview

This project satisfies all requirements for **Task 2 (LRU Cache)**:
- **Positive Capacity:** Initializes cache with a fixed positive capacity[cite: 4].
- **`get(key)`:** Returns stored value if present; otherwise `-1`[cite: 4]. Marks key as *Most Recently Used*[cite: 4].
- **`put(key, value)`:** Inserts or updates key/value pairs[cite: 4]. Evicts the *Least Recently Used* entry when capacity is exceeded[cite: 4].
- **$O(1)$ Time Complexity:** Both `get()` and `put()` run in $O(1)$ average time[cite: 4].

---

## 🏗️ Data Structure Selection & Design

### Why JavaScript `Map`?
JavaScript’s native `Map` object retains key insertion order. When iterating or retrieving keys from a `Map`, elements are returned in the order they were inserted.

By leveraging this built-in ordering mechanic:
1. **Hash Table Lookup ($O(1)$):** `Map` acts as a Hash Map for instant key lookups.
2. **Doubly Linked List Mechanics ($O(1)$):** When a key is accessed or updated, deleting and re-setting the key moves it to the back of the Map (Most Recently Used). The very first key in the Map naturally represents the *Least Recently Used* item.

This avoids the overhead of manually constructing a custom Doubly Linked List while maintaining strictly $O(1)$ performance.

---

## ⏱️ Complexity Analysis

| Operation | Time Complexity | Space Complexity | Explanation |
| :--- | :--- | :--- | :--- |
| **`get(key)`** | **$O(1)$** | $O(1)$ | Direct lookup via Map keys and $O(1)$ re-insertion[cite: 4]. |
| **`put(key, value)`** | **$O(1)$** | $O(1)$ | Direct insertion or eviction of the first key in Map[cite: 4]. |
| **Overall Cache** | — | **$O(N)$** | $N$ is the maximum capacity of the cache. |

---

## 💻 Source Code (`task2.js`)

```javascript
class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("Capacity must be a positive integer.");
    }
    this.capacity = capacity;
    this.cache = new Map();
  }

  /**
   * Get item by key and mark it as Most Recently Used
   * @param {string|number} key
   * @returns {any}
   */
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    // Move key to the end (Most Recently Used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  /**
   * Insert or update item, evicting LRU item if capacity is exceeded
   * @param {string|number} key
   * @param {any} value
   */
  put(key, value) {
    if (this.cache.has(key)) {
      // Remove existing key to refresh position
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict Least Recently Used (first key in Map)
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }

    // Insert new key-value pair as Most Recently Used
    this.cache.set(key, value);
  }
}

// ==========================================
// Test Cases Execution
// ==========================================
console.log("--- Starting LRU Cache Execution ---");

const cache = new LRUCache(2);

cache.put("A", 10);
console.log('put("A", 10)');

cache.put("B", 20);
console.log('put("B", 20)');

console.log('get("A") ->', cache.get("A")); // Expected: 10

cache.put("C", 30);
console.log('put("C", 30) -- Evicts "B"');

console.log('get("B") ->', cache.get("B")); // Expected: -1 (evicted)
console.log('get("C") ->', cache.get("C")); // Expected: 30
console.log('get("A") ->', cache.get("A")); // Expected: 10

console.log("--- Test Execution Complete ---");