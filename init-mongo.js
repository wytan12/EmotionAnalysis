db.createUser({
    user: 'liang',
    pwd: 'luya',
    roles: [
      {
        role: 'readWrite',
        db: 'Emotion'
      }
    ]
  })