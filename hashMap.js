const HashMap = (startingCapacity = 16, loadFactor = 0.75) => {
    const capacity = startingCapacity;
    const buckets = new Array(capacity);
    let size = 0;

    hash = (string) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }

        return hashCode % capacity;
    }

    set = (key, value) => {
        const index = hash(key);

        if (!buckets[index]) {
            buckets[index] = [];
        }

        const bucket = buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }

        bucket.push({key, value});
        size++

        if (size > capacity * loadFactor) {
            const bucketsIncrease = new Array(capacity)
            buckets = buckets.concat(bucketsIncrease);

            capacity = capacity * 2;
        }
    }

    get = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    return bucket[i].value;
                }
            }
        }

        return null;
    }

    has = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    return true;
                }
            }
        }

        return false;
    }

    remove = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    bucket.splice(i, 1);
                    size--;
                    return;
                }
            }
        }
    }

    length = () => {
        return size;
    }

    clear = () => {
        buckets.length = 0;
        size = 0;
    }

    keys = () => {
        const keysArray = [];

        for (const bucket of buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    keysArray.push(entry.key);
                }
            }
        }

        return keysArray;
    }

    values = () => {
        const valuesArray = [];

        for (const bucket of buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    valuesArray.push(entry.value);
                }
            }
        }

        return valuesArray;
    }

    entries = () => {
        const entriesArray = [];

        for (const bucket of buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    entriesArray.push([entry.key, entry.value]);
                }
            }
        }

        return entriesArray;
    }

    return { set, get, hash, length, remove, has, clear, keys, values, entries};
}

const map = HashMap();

map.set('name', 'viktor');
map.set('age', 24);
map.set('gender', 'male');

map.remove('gender');

console.log(map.length());
console.log(map.get('age'));
console.log(map.has('gender'));
console.log(map.entries());