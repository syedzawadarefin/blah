select * from games;

create table games(id integer primary key autoincrement,
game_title text not null,
developer text not null,
release_date text not null,
rating text not null,
notes text not null);

select * from games;

INSERT INTO games(game_title, developer, release_date, rating, notes) 
VALUES 
('VALORANT', 'Riot Games', '2020-06-02', 5, 'Exciting new shooter game'),
('Fortnite', 'Epic Games', '2021-07-21', 4, 'An amazing Battle Royale experience'),
('Marvel Rivals', 'NetEase Games', '2024-12-06', 4, 'Fast-paced multiplayer shooter'),
('Hades', 'Supergiant Games', '2018-12-06', 5, 'Roguelike action role-playing game');

delete from games where id > 0;