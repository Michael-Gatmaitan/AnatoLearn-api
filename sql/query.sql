CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    passw TEXT NOT NULL,
    fname TEXT NOT NULL,
    mname TEXT,
    lname TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS activity_type (
    id SERIAL PRIMARY KEY,
    act_type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    topic_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS total_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    topic_id INTEGER NOT NULL,
    total_score INT NOT NULL,
    accuracy INT NOT NULL,

    CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,

    CONSTRAINT fk_topic
    FOREIGN KEY (topic_id)
    REFERENCES topics (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_scores (
    id SERIAL PRIMARY KEY,
    act_type_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    topic_id INTEGER NOT NULL,
    score INT NOT NULL,

    CONSTRAINT fk_act_type
    FOREIGN KEY (act_type_id)
    REFERENCES activity_type (id)
    ON DELETE CASCADE,

    CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,

    CONSTRAINT fk_topic
    FOREIGN KEY (topic_id)
    REFERENCES topics (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL,
    act_type_id INTEGER NOT NULL,

    CONSTRAINT fk_topic
    FOREIGN KEY (topic_id)
    REFERENCES topics (id)
    ON DELETE CASCADE,

    CONSTRAINT fk_act_type
    FOREIGN KEY (act_type_id)
    REFERENCES activity_type (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activitie_qa (
    id SERIAL PRIMARY KEY,
    act_id INTEGER NOT NULL,

    CONSTRAINT fk_act
    FOREIGN KEY (act_id)
    REFERENCES activities (id)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS video_type (
    id SERIAL PRIMARY KEY,
    video_type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL,
    video_type_id INTEGER NOT NULL,
    video_path TEXT NOT NULL,

    CONSTRAINT fk_topic
    FOREIGN KEY (topic_id)
    REFERENCES topics (id)
    ON DELETE CASCADE,

    CONSTRAINT fk_video_type
    FOREIGN KEY (video_type_id)
    REFERENCES video_type (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    total_scores_id INTEGER NOT NULL,
    image_cert_path TEXT NOT NULL,
    video_type TEXT NOT NULL,
    has_certificate BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_total_scores
    FOREIGN KEY (total_scores_id)
    REFERENCES total_scores (id)
    ON DELETE CASCADE
);
