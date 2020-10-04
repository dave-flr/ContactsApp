create database contacts
	with owner postgres;

create table contacts
(
    id           serial not null
        constraint contacts_pkey
            primary key,
    phone_number text   not null,
    name         text   not null
);

alter table contacts
    owner to postgres;

INSERT INTO public.contacts (id, phone_number, name) VALUES (1, '+505 8174 5960', 'David Flores');
INSERT INTO public.contacts (id, phone_number, name) VALUES (2, '+1 541 458 2589', 'Carl Sagan');

create table "user"
(
    id       serial not null
        constraint user_pkey
            primary key,
    username text   not null
        constraint user_username_key
            unique,
    password text   not null
);

alter table "user"
    owner to postgres;

INSERT INTO public."user" (id, username, password) VALUES (1, 'dave', '$2b$12$tf2f1VUiA7.EeP32DtgihOIqA8.J2dYT2Qlv3iFsUbIZ6mWZ0ofxm');
