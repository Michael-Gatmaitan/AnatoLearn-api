--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: act_qa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.act_qa (
    id integer NOT NULL,
    act_id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    choices jsonb
);


ALTER TABLE public.act_qa OWNER TO postgres;

--
-- Name: act_qa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.act_qa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.act_qa_id_seq OWNER TO postgres;

--
-- Name: act_qa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.act_qa_id_seq OWNED BY public.act_qa.id;


--
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    topic_id integer NOT NULL,
    act_type_id integer NOT NULL
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activities_id_seq OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- Name: activity_scores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_scores (
    id integer NOT NULL,
    act_type_id integer NOT NULL,
    user_id integer NOT NULL,
    topic_id integer NOT NULL,
    score integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    total_scores_id integer
);


ALTER TABLE public.activity_scores OWNER TO postgres;

--
-- Name: activity_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activity_scores_id_seq OWNER TO postgres;

--
-- Name: activity_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_scores_id_seq OWNED BY public.activity_scores.id;


--
-- Name: activity_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_type (
    id integer NOT NULL,
    act_type text NOT NULL
);


ALTER TABLE public.activity_type OWNER TO postgres;

--
-- Name: activity_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activity_type_id_seq OWNER TO postgres;

--
-- Name: activity_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_type_id_seq OWNED BY public.activity_type.id;


--
-- Name: certificates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificates (
    id integer NOT NULL,
    total_scores_id integer NOT NULL,
    image_cert_path text NOT NULL,
    video_type text NOT NULL,
    has_certificate boolean DEFAULT true
);


ALTER TABLE public.certificates OWNER TO postgres;

--
-- Name: certificates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.certificates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.certificates_id_seq OWNER TO postgres;

--
-- Name: certificates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.certificates_id_seq OWNED BY public.certificates.id;


--
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    topic_name text NOT NULL
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topics_id_seq OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: total_scores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.total_scores (
    id integer NOT NULL,
    user_id integer NOT NULL,
    topic_id integer NOT NULL,
    total_score integer NOT NULL,
    accuracy integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.total_scores OWNER TO postgres;

--
-- Name: total_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.total_scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.total_scores_id_seq OWNER TO postgres;

--
-- Name: total_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.total_scores_id_seq OWNED BY public.total_scores.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    fname text NOT NULL,
    mname text NOT NULL,
    lname text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: video_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_type (
    id integer NOT NULL,
    video_type text NOT NULL
);


ALTER TABLE public.video_type OWNER TO postgres;

--
-- Name: video_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.video_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.video_type_id_seq OWNER TO postgres;

--
-- Name: video_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.video_type_id_seq OWNED BY public.video_type.id;


--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    topic_id integer NOT NULL,
    video_type_id integer NOT NULL,
    video_path text NOT NULL
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.videos_id_seq OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: act_qa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.act_qa ALTER COLUMN id SET DEFAULT nextval('public.act_qa_id_seq'::regclass);


--
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- Name: activity_scores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_scores ALTER COLUMN id SET DEFAULT nextval('public.activity_scores_id_seq'::regclass);


--
-- Name: activity_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_type ALTER COLUMN id SET DEFAULT nextval('public.activity_type_id_seq'::regclass);


--
-- Name: certificates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates ALTER COLUMN id SET DEFAULT nextval('public.certificates_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Name: total_scores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.total_scores ALTER COLUMN id SET DEFAULT nextval('public.total_scores_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: video_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_type ALTER COLUMN id SET DEFAULT nextval('public.video_type_id_seq'::regclass);


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: act_qa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.act_qa (id, act_id, question, answer, choices) FROM stdin;
4	2	What are the two main parts of the human skeletal system?	b	{"a": "Muscular and Nervous system", "b": "Axial and Appendicular skeleton", "c": "Muscular and Nervous syviostem", "d": "Digestive and Excretory system"}
5	2	How many bones does the adult human skeleton have?	a	{"a": "206", "b": "150", "c": "300", "d": "100"}
6	2	Which part of the skeleton includes the skull, vertebral column, and ribs?	b	{"a": "Appendicular skeleton", "b": "Axial skeleton", "c": "Pelvic girdle", "d": "Upper limbs"}
7	2	The appendicular skeleton is mainly responsible for?	c	{"a": "Protecting internal organs", "b": "Supporting the head", "c": "Movement and interaction with the environment", "d": "Producing red blood cells"}
8	2	Which bones make up the shoulder girdle?	b	{"a": "Protecting internal organsFemur and tibia", "b": "Supporting the headClavicle and scapula", "c": "Movement and interaction with the environmentCarpals and metacarpals", "d": "Producing red blood cellsVertebrae and ribs"}
9	2	Which bone is known as the collarbone?	b	{"a": "Scapula", "b": "Clavicle", "c": "Femur", "d": "Humerus"}
10	2	What is the function of the vertebral column?	b	{"a": "To protect the brain", "b": "To support the head and body and protect the spinal cord", "c": "To connect the ribs", "d": "To produce blood cells"}
13	2	The pelvic girdle consists mainly of?	b	{"a": "Clavicles", "b": "Coxal (hip) bones", "c": "Scapulae", "d": "Sternum"}
14	2	Which of the following is NOT a function of the skeletal system?	d	{"a": "Support", "b": "Protection", "c": "Movement", "d": "Digestion"}
25	2	Which bones make up the lower limbs?	b	{"a": "Radius and ulna", "b": "Carpals and metacarpals", "c": "Femur, tibia, fibula, patella, tarsals, metatarsals, and phalanges", "d": "Vertebrae and ribs"}
27	11	What is the main function of the respiratory system?	c	{"a": "To digest food", "b": "To pump blood", "c": "To allow breathing and gas exchange", "d": "To send messages to the brain"}
28	11	What part of the respiratory system filters, warms, and moistens the air we breathe?	b	{"a": "Larynx", "b": "Nasal cavity", "c": "Trachea", "d": "Alveoli"}
29	11	What is another name for the pharynx?	c	{"a": "Voice box", "b": "Windpipe", "c": "Throat", "d": "Chest"}
30	11	Where are the vocal cords found?	c	{"a": "Trachea", "b": "Bronchi", "c": "Larynx", "d": "Diaphragm"}
31	11	Which part of the respiratory system is also called the windpipe?	b	{"a": "Larynx", "b": "Trachea", "c": "Bronchi", "d": "Alveoli"}
32	11	What branches off from the trachea and leads to the lungs?	c	{"a": "Bronchioles", "b": "Alveoli", "c": "Bronchi", "d": "Diaphragm"}
33	11	What are the smaller tubes that branch off from the bronchi?	c	{"a": "Alveoli", "b": "Larynx", "c": "Bronchioles", "d": "Capillaries"}
34	11	Where does the exchange of oxygen and carbon dioxide take place?	c	{"a": "Larynx", "b": "Trachea", "c": "Alveoli", "d": "Pharynx"}
35	11	Which organ is responsible for breathing and contains the alveoli?	b	{"a": "Heart", "b": "Lungs", "c": "Liver", "d": "Stomach"}
36	11	What muscle helps you breathe by moving up and down?	b	{"a": "Heart", "b": "Diaphragm", "c": "Lungs", "d": "Bronchus"}
37	17	What is the largest part of the brain?	c	{"a": "Brain Stem", "b": "Spinal Cord", "c": "Cerebrum", "d": "Cerebellum"}
38	17	Which part of the brain controls balance and muscle coordination?	b	{"a": "Cerebrum", "b": "Cerebellum", "c": "Medulla", "d": "Spinal cord"}
39	17	What does the brain stem primarily control?	c	{"a": "Emotions", "b": "Memory", "c": "Autonomic functions", "d": "Reflexes"}
40	17	Where does the spinal cord begin?	c	{"a": "Brain stem", "b": "Cerebellum", "c": "Medulla oblongata", "d": "Cortex"}
41	17	What part of the nervous system collects information from the senses?	b	{"a": "Central nervous system", "b": "Peripheral nervous system", "c": "Sympathetic system", "d": "Parasympathetic system"}
42	17	Which of the following is not part of a neuron?	b	{"a": "Dendrite", "b": "Synapse", "c": "Cell body", "d": "Axon"}
43	17	What type of neuron connects sensory and motor neurons?	c	{"a": "Sensory neuron", "b": "Motor neuron", "c": "Interneuron", "d": "Mixed neuron"}
44	17	Which neuron carries signals from the brain to muscles?	d	{"a": "Interneuron", "b": "Sensory neuron", "c": "Reflex neuron", "d": "Motor neuron"}
45	17	Which part of the nervous system controls vital signs like heartbeat and temperature?	a	{"a": "Autonomic nervous system", "b": "Brain stem", "c": "Spinal cord", "d": "Cerebrum"}
46	17	If blood pressure is too high, what system tells the heart to slow down?	d	{"a": "Central nervous system", "b": "Sympathetic", "c": "Somatic", "d": "Parasympathetic"}
47	5	What is the main organ of the integumentary system?	b	{"a": "Heart", "b": "Skin", "c": "Bones", "d": "Lungs"}
48	5	What does the skin protect your body from?	b	{"a": "Brain", "b": "Germs and dirt", "c": "Laughter", "d": "Light"}
49	5	What part of the hair can you see above your skin?	c	{"a": "Hair root", "b": "Hair bulb", "c": "Hair shaft", "d": "Hair pore"}
50	5	What layer of skin is the outermost part?	c	{"a": "Dermin", "b": "Hypodermis", "c": "Epidermis", "d": "Follicle"}
51	5	What helps cool your body when it’s hot?	c	{"a": "Hair shaft", "b": "Nails", "c": "Sweat glands", "d": "Muscles"}
52	5	Which layer of the skin contains nerves and blood vessels?	b	{"a": "Edpidermis", "b": "Dermis", "c": "Hair root", "d": "Pore"}
53	5	What part of the skin stores fat and helps keep you warm?	b	{"a": "Epidermis", "b": "Dermis", "c": "Hypodermis", "d": "Hair shaft"}
54	5	Where does sweat come out on your skin?	b	{"a": "Hair root", "b": "Pore", "c": "Nail", "d": "Follicle"}
55	5	What protects your fingers and helps you pick up things?	c	{"a": "Skin", "b": "Hair", "c": "Nails", "d": "Pores"}
56	5	Why is the integumentary system important?	c	{"a": "It helps you breathe", "b": "It supports the bones", "c": "It protects your body and keeps it healthy", "d": "It makes you run faster"}
57	14	What is the main job of the heart?	c	{"a": "To clean the blood", "b": "To store oxygen", "c": "To pump blood throughout the body", "d": "To digest food"}
58	14	Which part of the heart receives oxygen-poor blood from the body?	b	{"a": "Left atrium", "b": "Right atrium", "c": "Left ventricle", "d": "Aorta"}
59	14	What is the name of the valve that prevents blood from going back into the right atrium?	d	{"a": "Mitral valve", "b": "Aortic valve", "c": "Pulmonary valve", "d": "Tricuspid valve"}
60	8	What is the first part of the digestive system where digestion begins?	c	{"a": "Esophagus", "b": "Stomach", "c": "Mouth", "d": "Small intestine"}
61	8	What do the teeth do in the digestive process?	b	{"a": "Absorb nutrients", "b": "Cut and grind food", "c": "Produce saliva", "d": "Break down proteins"}
62	8	What enzyme in saliva helps digest starch?	b	{"a": "Amylase", "b": "Ptyalin", "c": "Pepsin", "d": "Trypsin"}
63	8	Which organ connects the mouth to the stomach?	c	{"a": "Large intestine", "b": "Small intestine", "c": "Esophagus", "d": "Rectum"}
64	8	What movement pushes food through the esophagus?	c	{"a": "Digestion", "b": "Filtration", "c": "Peristalsis", "d": "Constriction"}
65	8	What is the function of gastric juices in the stomach?	c	{"a": "Absorb water", "b": "Secrete saliva", "c": "Break down proteins and fats", "d": "Transport waste"}
66	8	How long is the small intestine approximately?	c	{"a": "2 meters", "b": "5 meters", "c": "7 meters", "d": "9 meters"}
67	8	Where does the final digestion and absorption occur?	d	{"a": "Mouth", "b": "Large intestine", "c": "Rectum", "d": "Small intestine"}
68	8	What is the main function of the large intestine?	b	{"a": "Protein digestion", "b": "Storage of water and undigested food", "c": "Starch absorption", "d": "Vitamin production"}
69	8	What part of the digestive system stores feces before elimination?	c	{"a": "Stomach", "b": "Esophagus", "c": "Rectum", "d": "Small intestine"}
72	3	The human adult skeleton is made up of 206 bones.	true	\N
73	3	The axial skeleton includes the limbs and girdles.	false	\N
74	3	The vertebral column protects the spinal cord.	true	\N
75	3	The clavicle is also called the collarbone.	true	\N
76	3	The appendicular skeleton helps with movement.	true	\N
77	3	The skull is part of the appendicular skeleton.	false	\N
78	3	The pelvic girdle is made up of hip bones called coxal bones.	true	\N
79	3	The ribs protect the heart and lungs.	true	\N
80	3	The femur is a bone found in the upper limbs.	false	\N
81	3	The skeletal system provides support and protection for the body.	true	\N
82	6	The skin is the largest organ in your body.	true	\N
83	6	Hair only grows on your head.	false	\N
84	6	The sweat glands help your body stay cool.	true	\N
85	6	The epidermis is the inner layer of the skin.	false	\N
86	6	Nails help protect the tips of your fingers and toes.	true	\N
87	6	The dermis contains nerves and blood vessels.	true	\N
88	6	 The hypodermis is also called the subcutaneous layer.	true	\N
89	6	Sweat comes out through the pores in your skin.	true	\N
90	6	The integumentary system includes the bones and muscles.	false	\N
91	6	The integumentary system protects your body from germs and injury.	true	\N
92	9	Digestion ends in the esophagus.	false	\N
93	9	Saliva helps convert starch into sugar.	true	\N
94	9	The esophagus is a muscular tube that connects the mouth to the stomach.	true	\N
95	9	Peristalsis is the process of absorbing nutrients.	false	\N
96	9	The stomach secretes gastric juice that helps digest food.	true	\N
97	9	The large intestine is where most digestion and absorption take place.	false	\N
98	9	Undigested food passes from the small intestine to the large intestine.	true	\N
99	9	The rectum is a part of the small intestine.	false	\N
100	9	The teeth play no role in digestion.	false	\N
101	9	The anus is where waste leaves the body.	true	\N
102	12	The nasal cavity has hairs and mucus that filter the air we breathe.	true	\N
103	12	The trachea carries food to the stomach.	false	\N
104	12	The alveoli are tiny air sacs where gas exchange happens.	true	\N
105	12	The diaphragm expands when you inhale.	false	\N
106	12	Bronchi are tubes that lead into each lung.	true	\N
107	12	The larynx is also called the throat.	false	\N
108	12	Air travels from the trachea directly to the alveoli.	true	\N
109	12	The respiratory system removes carbon dioxide from the body.	true	\N
110	12	The lungs are the main organs for gas exchange in the body.	true	\N
111	12	The bronchioles are larger than the bronchi.	false	\N
112	18	The cerebellum is larger than the cerebrum.	false	\N
113	18	The axon carries messages away from the cell body.	true	\N
114	18	The spinal cord ends in the cerebrum.	false	\N
115	18	Dendrites help neurons receive messages.	true	\N
116	18	The neuron is made up of four main parts.	false	\N
117	18	Interneurons are only found in the peripheral nervous system.	false	\N
118	18	Sensory neurons transmit messages from the sense organs.	true	\N
119	18	The sympathetic and parasympathetic nerves work together to maintain body balance.	true	\N
120	18	The brain stem controls thinking and memory.	false	\N
121	18	The peripheral nervous system extends from the spinal cord to the rest of the body.	true	\N
122	14	Blood goes to the lungs through which blood vessel?	a	{"a": "Pulmonary artery", "b": "Aorta", "c": "Vena cava", "d": "Pulmonary vein"}
123	14	Which chamber of the heart pumps oxygen-rich blood to the rest of the body?	a	{"a": "Left ventricle", "b": "Right atrium", "c": "Right ventricle", "d": "Left atrium"}
124	14	What do capillaries do in the circulatory system?	c	{"a": "Store blood", "b": "Help in breathing", "c": "Exchange oxygen, nutrients, and waste", "d": "Pump blood"}
125	14	Which vessel carries blood back to the heart?	b	{"a": "Artery", "b": "Vein", "c": "Aorta", "d": "Capillary"}
126	14	Which of the following carries oxygen-rich blood from the lungs to the heart?	a	{"a": "Pulmonary vein", "b": "Pulmonary artery", "c": "Inferior vena cava", "d": "Aorta"}
127	14	What helps veins move blood back to the heart?	b	{"a": "Gravity", "b": "Muscle movement and valves", "c": "Lungs", "d": "Capillaries"}
128	14	What is the largest artery in the body?	b	{"a": "Pulmonary artery", "b": "Aorta", "c": "Coronary artery", "d": "Vena cava"}
129	15	The right side of the heart pumps blood to the lungs.	true	\N
130	15	The mitral valve is located on the right side of the heart.	false	\N
131	15	Arteries carry oxygen-rich blood away from the heart.	true	\N
132	15	The pulmonary artery carries oxygen-rich blood to the body.	false	\N
133	15	The left ventricle is the strongest chamber because it pumps blood to the entire body.	true	\N
134	15	The capillaries are the largest blood vessels in the body.	false	\N
135	15	Blood in the veins always flows away from the heart.	false	\N
136	15	Valves in the heart and veins stop blood from flowing backward.	true	\N
137	15	The heart is part of the circulatory system.	true	\N
138	15	The inferior vena cava brings blood from the arms and head.	false	\N
\.


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activities (id, topic_id, act_type_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	2	1
5	2	2
6	2	3
7	3	1
8	3	2
9	3	3
10	4	1
11	4	2
12	4	3
13	5	1
14	5	2
15	5	3
16	6	1
17	6	2
18	6	3
19	7	1
20	7	2
21	7	3
22	8	1
23	8	2
24	8	3
\.


--
-- Data for Name: activity_scores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity_scores (id, act_type_id, user_id, topic_id, score, created_at, total_scores_id) FROM stdin;
\.


--
-- Data for Name: activity_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity_type (id, act_type) FROM stdin;
1	tap
2	mcq
3	tof
\.


--
-- Data for Name: certificates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificates (id, total_scores_id, image_cert_path, video_type, has_certificate) FROM stdin;
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topics (id, topic_name) FROM stdin;
1	skeletal
7	excretory
2	integumentary
3	digestive
4	respiratory
5	circulatory
6	nervous
8	muscular
\.


--
-- Data for Name: total_scores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.total_scores (id, user_id, topic_id, total_score, accuracy, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, fname, mname, lname) FROM stdin;
1	michael	mchlgtmtn@gmail.com	michealpogi	Michael	Zamora	Gatmaitan
2	mike123123123	mike123123123@gmail.com	$2b$10$I3tG1GAwpyA1fAtCLJWmL.XpPIgIPoHDUyZVMNExIPenSompHzNBe	mike	Zamora	gatmaitan
3	michealgatmaitan	sampleuser@gmail.com	$2b$10$JmxnLYLIEToZ/cVs69XeYuVXyXt2BJ17EvaJMTzrNFMpsmsz2goUa	Michael	Zamora	Gatmaitan
4			$2b$10$ukye9GsJ2uyvfSKdfg9NaeUoxsmyzMEWxlRoZtauIXcS4loJF3cNG			
5	michealsample	sampleulit@gmail.com	$2b$10$EQuymuvnbqJ9AuAk5oBWIejh1UM38FAjYoA9ZobGmyg.eUMaH1vAu	sample	middle	sampleLastname
6	micheal	email@gmail.com	$2b$10$SbXUK3zrqbVEiUgMXOL7FeY7kob6wbhOwgoQr8YUFmwfZ9JGrlLBS	micheal	zamora	gatmaitan
\.


--
-- Data for Name: video_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video_type (id, video_type) FROM stdin;
1	introductory
2	lesson
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (id, topic_id, video_type_id, video_path) FROM stdin;
1	1	1	https://sample.introductory.com
2	1	2	https://sample.lesson.com
\.


--
-- Name: act_qa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.act_qa_id_seq', 138, true);


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_id_seq', 24, true);


--
-- Name: activity_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_scores_id_seq', 48, true);


--
-- Name: activity_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_type_id_seq', 3, true);


--
-- Name: certificates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.certificates_id_seq', 1, false);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 8, true);


--
-- Name: total_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.total_scores_id_seq', 17, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: video_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.video_type_id_seq', 2, true);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_id_seq', 2, true);


--
-- Name: act_qa act_qa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.act_qa
    ADD CONSTRAINT act_qa_pkey PRIMARY KEY (id);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: activity_scores activity_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_scores
    ADD CONSTRAINT activity_scores_pkey PRIMARY KEY (id);


--
-- Name: activity_type activity_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_type
    ADD CONSTRAINT activity_type_pkey PRIMARY KEY (id);


--
-- Name: certificates certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_pkey PRIMARY KEY (id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: total_scores total_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.total_scores
    ADD CONSTRAINT total_scores_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: video_type video_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_type
    ADD CONSTRAINT video_type_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: act_qa fk_act; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.act_qa
    ADD CONSTRAINT fk_act FOREIGN KEY (act_id) REFERENCES public.activities(id) ON DELETE CASCADE;


--
-- Name: activity_scores fk_act_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_scores
    ADD CONSTRAINT fk_act_type FOREIGN KEY (act_type_id) REFERENCES public.activity_type(id) ON DELETE CASCADE;


--
-- Name: activities fk_act_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT fk_act_type FOREIGN KEY (act_type_id) REFERENCES public.activity_type(id) ON DELETE CASCADE;


--
-- Name: total_scores fk_topic; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.total_scores
    ADD CONSTRAINT fk_topic FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: activity_scores fk_topic; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_scores
    ADD CONSTRAINT fk_topic FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: activities fk_topic; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT fk_topic FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: videos fk_topic; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT fk_topic FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: certificates fk_total_scores; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT fk_total_scores FOREIGN KEY (total_scores_id) REFERENCES public.total_scores(id) ON DELETE CASCADE;


--
-- Name: activity_scores fk_total_scores; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_scores
    ADD CONSTRAINT fk_total_scores FOREIGN KEY (total_scores_id) REFERENCES public.total_scores(id) ON DELETE CASCADE;


--
-- Name: total_scores fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.total_scores
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: activity_scores fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_scores
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: videos fk_video_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT fk_video_type FOREIGN KEY (video_type_id) REFERENCES public.video_type(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

