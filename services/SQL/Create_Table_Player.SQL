CREATE TABLE public."Player"
(
    player_id serial NOT NULL,
    first_name character varying(24) NOT NULL,
    last_name character varying(24),
    team_name character varying(48) NOT NULL
);

INSERT INTO public."Player"(first_name, last_name, team_name)	VALUES ('William', 'Nylander', 'Toronto Maple Leafs');