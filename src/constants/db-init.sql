create database expressapp;
use expressapp;

create table admins(
    id int auto_increment primary key,
    email varchar(225),
    password varchar(225),
    role varchar(225),
    createdAt datetime,
    updatedAt datetime
);

create table venue_admins(
    id int auto_increment primary key,
    email varchar(225),
    password varchar(225),
    role varchar(255),
    name varchar(225),
    mobile_number varchar(225),
    venue_name varchar(225),
    profile_picture varbinary(max)
);