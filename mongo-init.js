db.createUser({
  user: "liangluya",
  pwd: "liangluya",
  roles: [
    {
      role: "readWrite",
      db: "Emotion",
    },
  ],
});
