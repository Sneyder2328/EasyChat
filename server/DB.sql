DROP DATABASE easychat;
CREATE DATABASE easychat;
USE easychat;

CREATE TABLE IF NOT EXISTS User
(
    id           VARCHAR(36),
    email  VARCHAR(100),
    username     VARCHAR(100) NOT NULL,
    fullname VARCHAR(30) NOT NULL,
    photoURL VARCHAR(500),
    bio VARCHAR(200),
    password     VARCHAR(256) NOT NULL,
    createdAt    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt    DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX (email),
    UNIQUE INDEX (username)
);

CREATE TABLE IF NOT EXISTS Session
(
    token     varchar(36) NOT NULL,
    userId    varchar(36) NOT NULL,
    createdAt DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (token),
    foreign key (userId) references User (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `Group`
(
    id VARCHAR(36),
    name VARCHAR(36),
    photoUrl VARCHAR(500),
    bio VARCHAR(255),
    createdAt DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS Chat(
	id VARCHAR (36),
	blocked BOOLEAN,
	createdAt DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS UserChat(
    userId VARCHAR(36),
    chatId VARCHAR(36),
    createdAt DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (userId, chatId),
    foreign key (userId) references User (id) on update cascade on delete cascade,
	foreign key (chatId) references Chat (id) on update cascade on delete cascade
);

CREATE TABLE IF NOT EXISTS UserGroup
(
    userId VARCHAR(36),
    memberType ENUM('admin','normal'),
    groupId VARCHAR(36),
    createdAt DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (userId, groupId),
    foreign key (userId) references User (id) on update cascade on delete cascade,
	foreign key (groupId) references `Group` (id) on update cascade on delete cascade
);


CREATE TABLE IF NOT EXISTS MessageChat
(
  id VARCHAR(36),
    recipientId VARCHAR(36) NOT NULL,
    senderId VARCHAR(36) NOT NULL,
    content VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (recipientId) REFERENCES Chat (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (senderId) REFERENCES User (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MessageGroup
(
    id VARCHAR(36),
    recipientId VARCHAR(36) NOT NULL,
    senderId VARCHAR(36) NOT NULL,
    content VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (recipientId) REFERENCES `Group` (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (senderId) REFERENCES User (id) ON UPDATE CASCADE ON DELETE CASCADE
);