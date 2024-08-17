/* eslint-disable import/prefer-default-export */
export function diff(a, b, ignoreMissingKeys = false) {
  // Deep Diff of two objects (a and b). Returns an object with the differences.
  // If ignoreMissingKeys is true, then keys that are in b but not in a will be ignored.
  const difference = {};
  Object.keys(a).forEach((key) => {
    if (b[key] !== a[key]) {
      if (typeof b[key] === 'object' && typeof a[key] === 'object') {
        const objDiff = diff(a[key], b[key]);
        if (Object.keys(objDiff).length > 0) {
          difference[key] = objDiff;
        }
      } else {
        difference[key] = a[key];
      }
    }
  });

  if (!ignoreMissingKeys) {
    Object.keys(b).forEach((key) => {
      if (a[key] === undefined) {
        difference[key] = b[key];
      }
    });
  }

  return difference;
}

export function equal(a, b) {
  // Deep equality of two objects (a and b). Returns true if they are equal.
  return Object.keys(a).every((key) => {
    if (b[key] !== a[key]) {
      if (typeof b[key] === 'object' && typeof a[key] === 'object') {
        return equal(a[key], b[key]);
      }
      return false;
    }
    return true;
  });
}

export function dedupeListByKeys(list, keys) {
  const seen = new Set();
  return list.reverse().filter((item) => {
    const key = keys.map((k) => item[k]).join('|');
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/*
  Function to build a tree. Takes an array of objects and a key that is used to find the parent,
  as well as a idValue and idKey. The idValue is the current childs ID. The idKey is the key
  that will be used to find the parents entry and figure out its recursive parents.
  The function will return an array of objects.

  Example:
  findParents(
    [{name:"A", parent: null}, {name:"B", parent: "A"}, {name:"C", parent: "B"}],
    "parent",
    "name",
    "C",
  )

  Will return:
  [
    {name:"C", parent: "B"},
    {name:"B", parent: "A"},
    {name:"A", parent: null},
  ]
*/

export function findParents(list, parentKey, idKey, idValue) {
  const parents = [];

  const currentItem = list.find((item) => item[idKey] === idValue);
  parents.unshift(currentItem);

  const parent = list.find((item) => item[idKey] === currentItem[parentKey]);

  if (parent) {
    parents.unshift(parent);
  }

  if (parent && parent[parentKey]) {
    parents.unshift(...findParents(list, parentKey, idKey, parent[idKey]).slice(0, -1));
  }

  return parents;
}
