DROP DATABASE IF EXISTS blog;

CREATE DATABASE blog;

CREATE TABLE public.users (
	id serial NOT NULL,
	username varchar(45) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	img varchar(255) NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);

ALTER TABLE public.users ALTER COLUMN img DROP NOT NULL;

CREATE TABLE public.posts (
	id serial NOT NULL,
	title varchar(255) NOT NULL,
	"desc" varchar(1000) NOT NULL,
	img varchar(255) NOT NULL,
	"date" timestamp NULL,
	uid int4 NOT NULL,
	cat varchar(45) NULL,
	CONSTRAINT posts_pk PRIMARY KEY (id),
	CONSTRAINT posts_fk FOREIGN KEY (uid) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);