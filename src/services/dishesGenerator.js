const generateDish = () => {
  const adjective = [
    "Simple",
    "Awesome",
    "Amazing",
    "Tasty",
    "Good Old",
    "Elegant"
  ];
  const first = ["Potato", "Bread", "Chicken", "Salat", "Macaroni", "Pancakes"];
  const second = ["Fish", "Sauce", "Apple", "Orange", "Sprouts", "Muffins"];
  const ingredients = [
    {
      name: "butter",
      weight: 20
    },
    {
      name: "cheese",
      weight: 100
    },
    {
      name: "macaroni",
      weight: 200
    },
    {
      name: "salt",
      weight: 1
    },
    {
      name: "sugar",
      weight: 5
    },
    {
      name: "flour",
      weight: 400
    },
    {
      name: "fish",
      weight: 200
    },
    {
      name: "chicken",
      weight: 200
    }
  ];

  const name = `${adjective[Math.floor(Math.random() * adjective.length)]} ${
    first[Math.floor(Math.random() * first.length)]
  } with ${second[Math.floor(Math.random() * second.length)]}`;

  return {
    name,
    ingredients: shuffle(ingredients).slice(0, 4)
  };
};

const shuffle = o => {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

export { generateDish };
