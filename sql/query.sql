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
    topic_name TEXT NOT NULL,
    -- topic_description TEXT NOT NULL
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
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    choices TEXT,

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
    description TEXT NOT NULL,

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


CREATE TABLE IF NOT EXISTS Tags (
  id SERIAL PRIMARY KEY,
  topic_id INT NOT NULL,
  name TEXT NOT NULL,

  CONSTRAINT fk_topic
  FOREIGN KEY (topic_id)
  REFERENCES topics (id)
  ON DELETE CASCADE
);
--
CREATE TABLE IF NOT EXISTS usertagviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  tag_id INT NOT NULL,
  is_viewed BOOLEAN DEFAULT TRUE,

  CONSTRAINT fk_user
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE,

  CONSTRAINT fk_tag
  FOREIGN KEY (tag_id)
  REFERENCES tags (id)
  ON DELETE CASCADE,

  UNIQUE (user_id, tag_id)
);

-- Inserts
INSERT INTO activity_type (act_type) VALUES ('tap');
INSERT INTO activity_type (act_type) VALUES ('mcq');
INSERT INTO activity_type (act_type) VALUES ('tof');

INSERT INTO video_type (video_type) VALUES ('introductory');
INSERT INTO video_type (video_type) VALUES ('lesson');

INSERT INTO topics (topic_name) VALUES ('skeletal');
INSERT INTO topics (topic_name) VALUES ('respiratory');
INSERT INTO topics (topic_name) VALUES ('circulatory');
INSERT INTO topics (topic_name) VALUES ('nervous');
INSERT INTO topics (topic_name) VALUES ('mucular');

INSERT INTO videos (topic_id, video_type_id, video_path) VALUES (1, 1, 'https://sample.introductory.com');
INSERT INTO videos (topic_id, video_type_id, video_path) VALUES (1, 2, 'https://sample.lesson.com');

INSERT INTO activities (topic_id, act_type_id) VALUES (1, 1);
INSERT INTO activities (topic_id, act_type_id) VALUES (1, 2);
INSERT INTO activities (topic_id, act_type_id) VALUES (1, 3);
INSERT INTO activities (topic_id, act_type_id) VALUES (2, 1);

-- ACT (TAP ME) or 'tap'
INSERT INTO act_qa (act_id, question, answer) VALUES (1, 'bone1?', 'bone1.');
INSERT INTO act_qa (act_id, question, answer) VALUES (1, 'bone2?', 'bone2.');
INSERT INTO act_qa (act_id, question, answer) VALUES (1, 'bone3?', 'bone3.');

-- ACT (TAP ME) or 'mcq'
INSERT INTO act_qa (act_id, question, answer, choices) VALUES (2, 'What is ...1?', 'a', '[{"a":"Choice 1","b":"Choice 2","c":"Choice 3","d": "Choice 4"}]');
INSERT INTO act_qa (act_id, question, answer, choices) VALUES (2, 'What is ...2?', 'b', '[{"a":"Choice 1","b":"Choice 2","c":"Choice 3","d": "Choice 4"}]');
INSERT INTO act_qa (act_id, question, answer, choices) VALUES (2, 'What is ...3?', 'c', '[{"a":"Choice 1","b":"Choice 2","c":"Choice 3","d": "Choice 4"}]');

-- DEFINE IF THE PART IS CLICKED (dynamic checking)

-- select * from topics order by id;

-- INSERT INT
INSERT INTO Tags (topic_id, name) VALUES (1, 'skull');
INSERT INTO Tags (topic_id, name) VALUES (1, 'clavicle');
INSERT INTO Tags (topic_id, name) VALUES (1, 'scapula');
INSERT INTO Tags (topic_id, name) VALUES (1, 'humerus');
INSERT INTO Tags (topic_id, name) VALUES (1, 'ulna');
INSERT INTO Tags (topic_id, name) VALUES (1, 'radius');
INSERT INTO Tags (topic_id, name) VALUES (1, 'carpals');
INSERT INTO Tags (topic_id, name) VALUES (1, 'metacarpals');
INSERT INTO TAGS (topic_id, name) VALUES (1, 'phalange fingers');
INSERT INTO TAGS (topic_id, name) VALUES (1, 'phalange toes');
INSERT INTO Tags (topic_id, name) VALUES (1, 'femur');
INSERT INTO Tags (topic_id, name) VALUES (1, 'patella');
INSERT INTO Tags (topic_id, name) VALUES (1, 'tibia');
INSERT INTO Tags (topic_id, name) VALUES (1, 'fibula');
INSERT INTO Tags (topic_id, name) VALUES (1, 'tarsal');
INSERT INTO Tags (topic_id, name) VALUES (1, 'metatarsal');
INSERT INTO Tags (topic_id, name) VALUES (1, 'sternum');
INSERT INTO Tags (topic_id, name) VALUES (1, 'ribs');
INSERT INTO Tags (topic_id, name) VALUES (1, 'spine');
INSERT INTO Tags (topic_id, name) VALUES (1, 'coccyx');

INSERT INTO Tags (topic_id, name) VALUES (2, 'hair root');
INSERT INTO Tags (topic_id, name) VALUES (2, 'hair shaft');
INSERT INTO Tags (topic_id, name) VALUES (2, 'sweat gland');
INSERT INTO Tags (topic_id, name) VALUES (2, 'hypodermis');
INSERT INTO Tags (topic_id, name) VALUES (2, 'dermis');
INSERT INTO Tags (topic_id, name) VALUES (2, 'epidermis');
INSERT INTO Tags (topic_id, name) VALUES (2, 'pore of gland');
INSERT INTO Tags (topic_id, name) VALUES (3, 'mouth');
INSERT INTO Tags (topic_id, name) VALUES (3, 'esophagus');
INSERT INTO Tags (topic_id, name) VALUES (3, 'stomach');
INSERT INTO Tags (topic_id, name) VALUES (3, 'large intestine');
INSERT INTO Tags (topic_id, name) VALUES (3, 'small intestine');
INSERT INTO Tags (topic_id, name) VALUES (3, 'rectum');
INSERT INTO Tags (topic_id, name) VALUES (4, 'nasal cavity');
INSERT INTO Tags (topic_id, name) VALUES (4, 'lungs');
INSERT INTO Tags (topic_id, name) VALUES (4, 'pharynx');
INSERT INTO Tags (topic_id, name) VALUES (4, 'larynx');
INSERT INTO Tags (topic_id, name) VALUES (4, 'trachea');
INSERT INTO Tags (topic_id, name) VALUES (4, 'bronchi');
INSERT INTO Tags (topic_id, name) VALUES (5, 'blood vessels');
INSERT INTO Tags (topic_id, name) VALUES (5, 'heart');
INSERT INTO Tags (topic_id, name) VALUES (5, 'veins');
INSERT INTO Tags (topic_id, name) VALUES (5, 'capillaries');
INSERT INTO Tags (topic_id, name) VALUES (5, 'arteries');
INSERT INTO Tags (topic_id, name) VALUES (6, 'cerebrum');
INSERT INTO Tags (topic_id, name) VALUES (6, 'cerebellum');
INSERT INTO Tags (topic_id, name) VALUES (6, 'hypothalamus');
INSERT INTO Tags (topic_id, name) VALUES (6, 'brain stem');
INSERT INTO Tags (topic_id, name) VALUES (6, 'medulla oblangata');
