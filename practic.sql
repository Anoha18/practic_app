create table users (
    user_id serial primary key,
    name text null,
    lastname text null,
    password text null,
    email text null,
    phone text null,
    deleted boolean default false,
    created_at timestamp default now(),
    updated_at timestamp null
);

create table routes (
    route_id bigserial primary key,
    priority_id int null,
    name text null,
    description text null,
    date date null,
    time_start time null,
    time_end time null,
    created_at timestamp default now(),
    updated_at timestamp null,
    deleted boolean default false,
    creator_id int references users(user_id) null,
    foreign key (priority_id) references routes_priority(priority_id)
);

create table routes_priority (
    priority_id serial primary key,
    name text null,
    brief text null
);

create table refresh_tokens (
    refresh_token_id bigserial primary key,
    user_id int references users(user_id) not null,
    refresh_token text not null,
    ip text null,
    created_at timestamp default now(),
    updated_ap timestamp null,
    closed bool default false
);

create or replace function to_brief(txt text) returns text
language sql
as
    $$
    select
        replace(
        replace(
        replace(
        replace(
        replace(
        replace(
        replace(
        replace(
        replace(
        replace(
        replace(
        replace(
        replace(
        translate(lower($1),
        'абвгдезийклмнопрстуфц', 'abvgdezijklmnoprstufc'),
        'ж', 'zh'),
        'ч', 'ch'),
        'ш', 'sh'),
        'щ', 'shh'),
        'ъ', ''),
        'ы', 'y'),
        'э', 'eh'),
        'ю', 'yu'),
        'я', 'ya'),
        'ё', 'yo'),
        '', ''),
        ' ', '_'),
        'х', 'kh');
    $$;

insert into routes_priority(name, brief) values ('Высокий', upper(to_brief('Высокий'))),
                                                ('Обычный', upper(to_brief('Обычный')));

select * from routes_priority;

update routes_priority set brief = upper(to_brief(name))
where priority_id = priority_id;

select * from routes;