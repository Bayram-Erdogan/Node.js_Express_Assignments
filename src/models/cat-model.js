let cats = [
  {
    cat_id: 1,
    name: 'Milo',
    birthdate: '2020-05-10',
    weight: 4.5,
    owner: 'Bayram',
    image: 'https://loremflickr.com/320/240/cat',
  },
];

export const getCats = () => cats;

export const getCat = (id) => cats.find((cat) => cat.cat_id === id);

export const addCat = (cat) => {
  const newCat = {cat_id: cats.length + 1, ...cat};
  cats.push(newCat);
  return newCat;
};

export const updateCatById = (id, updates) => {
  const index = cats.findIndex((cat) => cat.cat_id === id);
  if (index === -1) {
    return null;
  }

  cats[index] = {
    ...cats[index],
    ...updates,
  };

  return cats[index];
};

export const deleteCatById = (id) => {
  const index = cats.findIndex((cat) => cat.cat_id === id);
  if (index === -1) {
    return null;
  }

  const [deleted] = cats.splice(index, 1);
  return deleted;
};
