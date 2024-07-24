-- Select Statements
SELECT player_id AS _id, first_name, last_name, team_name FROM player \
    ORDER BY player_id DESC LIMIT 7;

SELECT player_id AS _id, first_name, last_name, team_name FROM player WHERE player_id = $1

-- Insert Statement
INSERT INTO public.player(first_name, last_name, team_name) \
    VALUES ($1, $2, $3);

-- Update Statements
UPDATE public.player SET first_name=$2, last_name=$3, team_name=$4 WHERE player_id=$1;

UPDATE public.player SET first_name=$2, last_name=$3, team_name=$4 WHERE player_id=$1;

-- Delete Statement
DELETE FROM public.player WHERE player_id = $1;