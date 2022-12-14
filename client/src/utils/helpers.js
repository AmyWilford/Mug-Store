
// Function to pluralize product depending on quantity order
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

// IDBPromise helper used for stripe integration
export function idbPromise(storeName, method, object) {
  console.log(object);
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('mug-store', 1);
    let db, tx, store;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id', autoIncrement: true });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id', autoIncrement: true });
    };

    request.onerror = function (e) {
      console.log('There was an error');
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.add(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function () {
            console.log('I am all in the store', all.result);

            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
        // case "put":
        //   store.put(object);
        //   resolve(object);
        //   break;
        // case "get":
        //   const all = store.getAll();
        //   all.onsuccess = function () {
        //     console.log("I am all in the store", all.result);
        //     resolve(all.result);
        //   };
        //   break;
        // case "delete":
        //   store.delete(object._id);
        //   break;
        // default:
        //   console.log("No valid method");
        //   break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}

// Function to validateCustomText input to max 25 characters on custom mug page
export function validateCustomText(input) {
  if (input.length > 25) {
    return false;
  }
  return true;
}
