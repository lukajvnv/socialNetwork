-- OUATH TABLES
DROP TABLE if EXISTS OAUTH_CLIENT_DETAILS;
DROP TABLE if EXISTS OAUTH_APPROVALS;
DROP TABLE if EXISTS OAUTH_CLIENT_TOKEN;
DROP TABLE if EXISTS OAUTH_ACCESS_TOKEN;
DROP TABLE if EXISTS OAUTH_REFRESH_TOKEN;
DROP TABLE if EXISTS OAUTH_CODE;

CREATE TABLE OAUTH_CLIENT_DETAILS (
  CLIENT_ID VARCHAR(255) PRIMARY KEY,
  RESOURCE_IDS VARCHAR(255),
  CLIENT_SECRET VARCHAR(255),
  SCOPE VARCHAR(255),
  AUTHORIZED_GRANT_TYPES VARCHAR(255),
  WEB_SERVER_REDIRECT_URI VARCHAR(255),
  AUTHORITIES VARCHAR(255),
  ACCESS_TOKEN_VALIDITY INTEGER,
  REFRESH_TOKEN_VALIDITY INTEGER,
  ADDITIONAL_INFORMATION VARCHAR(4096),
  AUTOAPPROVE VARCHAR(255)
);

CREATE TABLE OAUTH_APPROVALS (
  USERID VARCHAR(255),
  CLIENTID VARCHAR(255),
  SCOPE VARCHAR(255),
  STATUS VARCHAR(10),
  EXPIRESAT TIMESTAMP,
  LASTMODIFIEDAT TIMESTAMP
);

CREATE TABLE OAUTH_CLIENT_TOKEN (
  TOKEN_ID VARCHAR(255),
  TOKEN BLOB,
  AUTHENTICATION_ID VARCHAR(255) PRIMARY KEY,
  USER_NAME VARCHAR(255),
  CLIENT_ID VARCHAR(255)
);

CREATE TABLE OAUTH_ACCESS_TOKEN (
  TOKEN_ID VARCHAR(255),
  TOKEN BLOB,
  AUTHENTICATION_ID VARCHAR(255) PRIMARY KEY,
  USER_NAME VARCHAR(255),
  CLIENT_ID VARCHAR(255),
  AUTHENTICATION BLOB,
  REFRESH_TOKEN VARCHAR(255)
);

CREATE TABLE OAUTH_REFRESH_TOKEN (
  TOKEN_ID VARCHAR(255),
  TOKEN BLOB,
  AUTHENTICATION BLOB
);

CREATE TABLE OAUTH_CODE (
  CODE VARCHAR(255),
  AUTHENTICATION BLOB
);

INSERT INTO OAUTH_CLIENT_DETAILS(CLIENT_ID, RESOURCE_IDS, CLIENT_SECRET, SCOPE, AUTHORIZED_GRANT_TYPES, AUTHORITIES, ACCESS_TOKEN_VALIDITY, REFRESH_TOKEN_VALIDITY)
 VALUES ('spring-security-oauth2-read-client', 'resource-server-rest-api',
 '$2a$04$WGq2P9egiOYoOFemBRfsiO9qTcyJtNRnPKNBl5tokP7IP.eZn93km',
 'read', 'password,authorization_code,refresh_token,implicit', 'USER', 10800, 2592000);

INSERT INTO OAUTH_CLIENT_DETAILS(CLIENT_ID, RESOURCE_IDS, CLIENT_SECRET, SCOPE, AUTHORIZED_GRANT_TYPES, AUTHORITIES, ACCESS_TOKEN_VALIDITY, REFRESH_TOKEN_VALIDITY)
 VALUES ('spring-security-oauth2-read-write-client', 'resource-server-rest-api',
 '$2a$04$soeOR.QFmClXeFIrhJVLWOQxfHjsJLSpWrU1iGxcMGdu.a5hvfY4W',
 'read,write', 'password,authorization_code,refresh_token,implicit', 'USER', 10800, 2592000);

-- PERSONALITY
insert into USER_ATTRIBUTE (type, value) values (0, 'Calm');
insert into USER_ATTRIBUTE (type, value) values (0, 'Active');
insert into USER_ATTRIBUTE (type, value) values (0, 'Cheerful');
insert into USER_ATTRIBUTE (type, value) values (0, 'Friendly');
insert into USER_ATTRIBUTE (type, value) values (0, 'Energetic');
insert into USER_ATTRIBUTE (type, value) values (0, 'Organised');
insert into USER_ATTRIBUTE (type, value) values (0, 'Funny');
insert into USER_ATTRIBUTE (type, value) values (0, 'Tolerant');
insert into USER_ATTRIBUTE (type, value) values (0, 'Easygoing');
insert into USER_ATTRIBUTE (type, value) values (0, 'Sociable');

-- LIFESTYLE
insert into USER_ATTRIBUTE (type, value) values (1, 'Traveler');
insert into USER_ATTRIBUTE (type, value) values (1, 'Athlete');
insert into USER_ATTRIBUTE (type, value) values (1, 'Gamer');
insert into USER_ATTRIBUTE (type, value) values (1, 'Vegan');
insert into USER_ATTRIBUTE (type, value) values (1, 'Dancer');
insert into USER_ATTRIBUTE (type, value) values (1, 'Book lover');
insert into USER_ATTRIBUTE (type, value) values (1, 'Tech lover');
insert into USER_ATTRIBUTE (type, value) values (1, 'Walker');
insert into USER_ATTRIBUTE (type, value) values (1, 'Partier');
insert into USER_ATTRIBUTE (type, value) values (1, 'Workaholic');

-- MUSIC
insert into USER_ATTRIBUTE (type, value) values (2, 'Pop');
insert into USER_ATTRIBUTE (type, value) values (2, 'Rock');
insert into USER_ATTRIBUTE (type, value) values (2, 'Alternative');
insert into USER_ATTRIBUTE (type, value) values (2, 'Dance');
insert into USER_ATTRIBUTE (type, value) values (2, 'Hip-hop');
insert into USER_ATTRIBUTE (type, value) values (2, 'Jaaz');
insert into USER_ATTRIBUTE (type, value) values (2, 'Blues');
insert into USER_ATTRIBUTE (type, value) values (2, 'Tolerant');
insert into USER_ATTRIBUTE (type, value) values (2, 'Punk');
insert into USER_ATTRIBUTE (type, value) values (2, 'Metal');

-- SPORT
insert into USER_ATTRIBUTE (type, value) values (3, 'Football');
insert into USER_ATTRIBUTE (type, value) values (3, 'Basketball');
insert into USER_ATTRIBUTE (type, value) values (3, 'Tennis');
insert into USER_ATTRIBUTE (type, value) values (3, 'MMA');
insert into USER_ATTRIBUTE (type, value) values (3, 'Gym');
insert into USER_ATTRIBUTE (type, value) values (3, 'Golf');
insert into USER_ATTRIBUTE (type, value) values (3, 'Swimming');
insert into USER_ATTRIBUTE (type, value) values (3, 'Skateboarding');
insert into USER_ATTRIBUTE (type, value) values (3, 'Baseball');
insert into USER_ATTRIBUTE (type, value) values (3, 'Volleyball');

-- FILM
insert into USER_ATTRIBUTE (type, value) values (4, 'Action');
insert into USER_ATTRIBUTE (type, value) values (4, 'Adventure');
insert into USER_ATTRIBUTE (type, value) values (4, 'Crime');
insert into USER_ATTRIBUTE (type, value) values (4, 'Horror');
insert into USER_ATTRIBUTE (type, value) values (4, 'Romance');
insert into USER_ATTRIBUTE (type, value) values (4, 'Thriller');
insert into USER_ATTRIBUTE (type, value) values (4, 'Sci-fi');
insert into USER_ATTRIBUTE (type, value) values (4, 'Animation');
insert into USER_ATTRIBUTE (type, value) values (4, 'Documentary');
insert into USER_ATTRIBUTE (type, value) values (4, 'Drama');

-- authorities
INSERT INTO AUTHORITY(ID, NAME) VALUES (1, 'COMPANY_CREATE');
INSERT INTO AUTHORITY(ID, NAME) VALUES (2, 'COMPANY_READ');
INSERT INTO AUTHORITY(ID, NAME) VALUES (3, 'COMPANY_UPDATE');
INSERT INTO AUTHORITY(ID, NAME) VALUES (4, 'COMPANY_DELETE');

-- settings
INSERT INTO SETTING(NAME, TYPE) VALUES ('set key 1', 'string');
INSERT INTO SETTING(NAME, TYPE) VALUES ('show birthday to other', 'boolean');
INSERT INTO SETTING(NAME, TYPE) VALUES ('show address to other', 'boolean');
INSERT INTO SETTING(NAME, TYPE) VALUES ('set key 4', 'string');

INSERT INTO SETTING_VALUE(VALUE, SETTING_ID) VALUES ('true', 2);
INSERT INTO SETTING_VALUE(VALUE, SETTING_ID) VALUES ('false', 2);
INSERT INTO SETTING_VALUE(VALUE, SETTING_ID) VALUES ('true', 3);
INSERT INTO SETTING_VALUE(VALUE, SETTING_ID) VALUES ('false', 3);
INSERT INTO SETTING_VALUE(VALUE, SETTING_ID) VALUES ('a', 1);
INSERT INTO SETTING_VALUE(VALUE, SETTING_ID) VALUES ('b', 1);

INSERT INTO USER(ID, USER_NAME, PASSWORD, ACCOUNT_EXPIRED, ACCOUNT_LOCKED, CREDENTIALS_EXPIRED, ENABLED, ROLE, FIRST_NAME, LAST_NAME, BIRTHDAY)
  VALUES (1, 'admin@gmail.com', '$2a$08$ptBz.xmum2qw2dEFr4VnZeVcwRVTp5COcJsqu7oONaQ.3Jl/XHo5y', FALSE, FALSE, FALSE, TRUE, 'ROLE_ADMIN', 'Admin', 'Adminovic', '1996-03-29');
INSERT INTO USER(ID, USER_NAME, PASSWORD, ACCOUNT_EXPIRED, ACCOUNT_LOCKED, CREDENTIALS_EXPIRED, ENABLED, ROLE, FIRST_NAME, LAST_NAME, BIRTHDAY, GENDER, ACTIVE_SINCE, ABOUT, OCCUPATION, ADDRESS, URL_PROFILE)
  VALUES (2, 'user1@gmail.com', '$2a$08$e9h6gbzWDr5sYkA96B1FoOKZUMg58UUnNGJKaVITSJgtK8kOIhdTC', FALSE, FALSE, FALSE, TRUE, 'ROLE_USER', 'Luka1', 'Jovanovic', '1996-03-29', 'Male', '2020-09-03', 'I am cool guy', 'It student', 'Drage Spasic 7', 'astronomy.jpg');
INSERT INTO USER(ID, USER_NAME, PASSWORD, ACCOUNT_EXPIRED, ACCOUNT_LOCKED, CREDENTIALS_EXPIRED, ENABLED, ROLE, FIRST_NAME, LAST_NAME, BIRTHDAY, GENDER, ACTIVE_SINCE, ABOUT, OCCUPATION, ADDRESS, URL_PROFILE)
  VALUES (3, 'user2@gmail.com', '$2a$08$cE.IOuWuYcfgGAlgP5N/RuCd7bUWobIpv0xxlZsH76uSEx/1rZNsG', FALSE, FALSE, FALSE, TRUE, 'ROLE_USER', 'User2', 'Korisnikovic', '1996-03-01', 'Male', '2020-09-13', 'I am cool SW guy', 'Sw student', 'Stevana Milovanova', 'circle.jpg');
INSERT INTO USER(ID, USER_NAME, PASSWORD, ACCOUNT_EXPIRED, ACCOUNT_LOCKED, CREDENTIALS_EXPIRED, ENABLED, ROLE, FIRST_NAME, LAST_NAME, BIRTHDAY, GENDER, ACTIVE_SINCE, ABOUT, OCCUPATION, ADDRESS)
  VALUES (4, 'user3@gmail.com', '$2a$08$pGUm4ii51QkkJiSCMrzYdeZp1MbYAxeMnbXrVjjZXM9KiECTXp6Ue', FALSE, FALSE, FALSE, TRUE, 'ROLE_USER', 'User3', 'Korisnikovic', '1996-02-06', 'Male', '2020-09-09', 'I am cool med guy', 'Med student', 'Drage Spasic 11');
INSERT INTO USER(ID, USER_NAME, PASSWORD, ACCOUNT_EXPIRED, ACCOUNT_LOCKED, CREDENTIALS_EXPIRED, ENABLED, ROLE, FIRST_NAME, LAST_NAME, BIRTHDAY, GENDER, ACTIVE_SINCE, ABOUT, OCCUPATION, ADDRESS)
  VALUES (5, 'user4@gmail.com', '$2a$08$McaT5McF3jF92eLJk1d4FeooWUwsjdJ033yJaAR1C9JnJJBgJCtii', FALSE, FALSE, FALSE, TRUE, 'ROLE_USER', 'User4', 'Korisnikovic', '1996-09-06', 'Female', '2020-09-18', 'I am cool tech guy', 'Tech student', 'Drage Spasic 13');
INSERT INTO USER(ID, USER_NAME, PASSWORD, ACCOUNT_EXPIRED, ACCOUNT_LOCKED, CREDENTIALS_EXPIRED, ENABLED, ROLE, FIRST_NAME, LAST_NAME, BIRTHDAY, GENDER, ACTIVE_SINCE, ABOUT, OCCUPATION, ADDRESS)
  VALUES (6, 'user5@gmail.com', '$2a$08$V3adJ7f1y6HL.1YXSptCBeKiqpX1dX4WX1A.77RE6hYOisk09Okl2', FALSE, FALSE, FALSE, TRUE, 'ROLE_USER', 'User5', 'Korisnikovic', '1996-10-06', 'Male', '2020-09-22', 'I am cool bio guy', 'Bio student', 'Drage Spasic 5');

INSERT INTO USERS_AUTHORITIES(USER_ID, AUTHORITY_ID) VALUES (1, 1);

INSERT INTO USERS_ATTRIBUTES(USER_ID, ATTRIBUTE_ID) VALUES (2, 1);
INSERT INTO USERS_ATTRIBUTES(USER_ID, ATTRIBUTE_ID) VALUES (2, 12);

INSERT INTO USER_SETTING(USER_ID, SETTING_ID, VALUE) VALUES (2, 1, 'b');
INSERT INTO USER_SETTING(USER_ID, SETTING_ID, VALUE) VALUES (2, 2, 'true');
INSERT INTO USER_SETTING(USER_ID, SETTING_ID, VALUE) VALUES (2, 3, 'false');
INSERT INTO USER_SETTING(USER_ID, SETTING_ID, VALUE) VALUES (2, 4, 'random');


INSERT INTO FRIENDSHIP (SENDER_ID, RECEIVER_ID, REQUEST_DATE, RESPONSE_DATE, STATUS) VALUES (2, 3, '2020-09-01', '2020-09-05', 1);
INSERT INTO FRIENDSHIP (SENDER_ID, RECEIVER_ID, REQUEST_DATE, RESPONSE_DATE, STATUS) VALUES (2, 5, '2020-09-01', '2020-09-05', 1);
INSERT INTO FRIENDSHIP (SENDER_ID, RECEIVER_ID, REQUEST_DATE, RESPONSE_DATE, STATUS) VALUES (6, 2, '2020-09-01', '2020-09-05', 1);
INSERT INTO FRIENDSHIP (SENDER_ID, RECEIVER_ID, REQUEST_DATE, RESPONSE_DATE, STATUS) VALUES (2, 4, '2020-08-01', '2020-09-05', 0);
INSERT INTO FRIENDSHIP (SENDER_ID, RECEIVER_ID, REQUEST_DATE, RESPONSE_DATE, STATUS) VALUES (3, 4, '2020-09-15', '2020-09-05', 2);

INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (2, 3, 'User1 to user2 no. 1', '2020-09-10');
INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (3, 2, 'User2 to user1 no. 2', '2020-09-14 16:48:00');
INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (3, 4, 'User2 to user3 no. 1', '2020-09-14 16:55:00');
INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (5, 2, 'User4 to user1 no. 1', '2020-09-14 16:48:00');
--INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (2, 6, 'User1 to user5 no. 1', '2020-09-14 16:55:00');

INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (2, 3, 'User1 to user2 no. 1', '2020-09-21');
INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (3, 2, 'User2 to user1 no. 2', '2020-09-22 16:48:00');
INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (2, 3, 'User1 to user2 no. 1', '2020-09-23');
INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (3, 2, 'User2 to user1 no. 2', '2020-09-24 16:48:00');
INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (2, 3, 'User1 to user2 no. 1', '2020-09-25');
INSERT INTO MESSAGE (SENDER_ID, RECEIVER_ID, TEXT, SEND_TIME) VALUES (3, 2, 'User2 to user1 no. 2', '2020-09-26 16:48:00');

INSERT INTO POST (AUTHOR_ID, TEXT, FEELING, POST_TIME, STYLE, IMAGE_URI, FILE_URI) VALUES (3, 'New post by user2', 'exited', '2020-09-10 10:55:00', 'green', 'circle.jpg', 'IT_kratak_pregled.pdf');
INSERT INTO POST (AUTHOR_ID, TEXT, FEELING, POST_TIME) VALUES (3, 'New post by user2', 'sad', '2020-09-11 16:55:00');
INSERT INTO POST (AUTHOR_ID, TEXT, FEELING, POST_TIME, STYLE) VALUES (3, 'New post by user2', 'love', '2020-09-13 16:55:00', 'green');
INSERT INTO POST (AUTHOR_ID, TEXT, FEELING, POST_TIME, STYLE) VALUES (2, 'New post by user1', 'Exited', '2020-09-25 16:59:00', 'green');

INSERT INTO COMMENT (AUTHOR_ID, POST_ID, TEXT, COMMENT_TIME) VALUES (2, 1, 'New comment1', '2020-09-10 16:55:00');
INSERT INTO COMMENT (AUTHOR_ID, POST_ID, TEXT, COMMENT_TIME) VALUES (3, 1, 'New comment2', '2020-09-11 16:55:00');

