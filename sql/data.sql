-- Examples of all possible insertions

INSERT INTO users(email, firstname, lastname, password)
VALUES ("jushutch@umich.edu", "Justin", "Hutchins", "password");

INSERT INTO articles(title, publisher, tag, image_url, url)
VALUES ("Microsoft to acquire Activision Blizzard for $68.7 billion", "The Verge", "Technology", "",
"https://www.theverge.com/2022/1/18/22889258/microsoft-activision-blizzard-xbox-acquisition-call-of-duty-overwatch");

INSERT INTO articles(title, publisher, tag, image_url, url)
VALUES ("Microsoft to acquire Activision Blizzard for $68.7 billion", "The Verge", "Technology", "",
"https://www.theverge.com/2022/1/18/22889258/microsoft-activision-blizzard-xbox-acquisition-call-of-duty-overwatch");

INSERT INTO articles(title, publisher, tag, image_url, url)
VALUES ("Microsoft to acquire Activision Blizzard for $68.7 billion", "The Verge", "Technology", "",
"https://www.theverge.com/2022/1/18/22889258/microsoft-activision-blizzard-xbox-acquisition-call-of-duty-overwatch");

INSERT INTO articles(title, publisher, tag, image_url, url)
VALUES ("Microsoft to acquire Activision Blizzard for $68.7 billion", "The Verge", "Technology", "",
"https://www.theverge.com/2022/1/18/22889258/microsoft-activision-blizzard-xbox-acquisition-call-of-duty-overwatch");

INSERT INTO rooms(article_id) VALUES (1);

INSERT INTO users_to_rooms(user, room, color)
VALUES (1, 1, 0);

INSERT INTO messages(message, user, room)
VALUES ("This article is awesome!", 1, 1);

INSERT INTO messages(message, user, room)
VALUES ("This is my second message!", 1, 1);

INSERT INTO trophies(earnedURL, unearnedURL, description)
VALUES ("temp", "temp", "The first trophy!");

INSERT INTO users_to_trophies(user, trophy)
VALUES (1, 1);