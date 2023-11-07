exports.createMockDB = () => {
  const db = {};

  db.users = [
    { id: 1, username: "adamthefirst", password: "apple", isAdmin: false, isSuspended: false },
    { id: 2, username: "eve", password: "apple", isAdmin: false, isSuspended: false },
    { id: 3, username: "johndoe123", password: "12345", isAdmin: false, isSuspended: false },
    { id: 4, username: "janesmith456", password: "password123", isAdmin: false, isSuspended: false },
  ];

  db.blogs = [
    {
      id: 1,
      title: "Why I couldn't stop Eve",
      text: "She ate the apple when I was asleep. Then baked me a pie and gave it to me. I didn't know at the time, but after eating the pie, it was too late, and I didn't care anymore. Plus she is my wife and partner. For better and for worse.",
      createdByUser: db.users[0],
    },
    {
      id: 2,
      title: "A Day at the Park",
      text: "Spent a lovely day at the park with the family. We played frisbee, had a picnic, and enjoyed the sunshine.",
      createdByUser: db.users[1],
    },
    {
      id: 3,
      title: "Coding Adventures",
      text: "Just completed a challenging coding project. It's amazing how a few lines of code can create something incredible.",
      createdByUser: db.users[2],
    },
    {
      id: 4,
      title: "Travel Diaries",
      text: "Exploring a new city is always an adventure. The architecture, the food, and the people make it an unforgettable experience.",
      createdByUser: db.users[3],
    },
  ];

  db.comments = [
    {
      text: "Wow, how did the apple taste?",
      createdByUser: db.users[1],
      createdOnPost: db.blogs[0],
      isHidden: false,
    },
    {
      text: "It must have been a unique experience!",
      createdByUser: db.users[1],
      createdOnPost: db.blogs[2],
      isHidden: false,
    },
    {
      text: "I can't believe you ate the whole thing.",
      createdByUser: db.users[2],
      createdOnPost: db.blogs[1],
      isHidden: false,
    },
    {
      text: "A pie as a disguise, that's creative!",
      createdByUser: db.users[2],
      createdOnPost: db.blogs[0],
      isHidden: false,
    },
    {
      text: "I need to try this recipe!",
      createdByUser: db.users[3],
      createdOnPost: db.blogs[0],
      isHidden: false,
    },
    {
      text: "Looks like a perfect day!",
      createdByUser: db.users[0],
      createdOnPost: db.blogs[1],
      isHidden: false,
    },
  ];
  return db;
};
