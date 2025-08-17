create table users(
    user_id serial primary key,
    email varchar(255) unique not null,
    password_hash varchar(255) not null,
    user_name varchar(255),
    preferences_json JSONB,
    created_at timestamp default current_timestamp
);

create table jobs(
    job_id serial primary key,
    source_id varchar(100),
    title varchar(100) not null,
    company varchar(100),
    job_location varchar(100),
    salary_min numeric,
    salary_max numeric,
    description text,
    job_type varchar(100),
    posted_at timestamp default current_timestamp,
    ingested_at timestamp default current_timestamp,
    raw_payload JSONB
);

create table sentiments(
    sentiment_id serial primary key,
    job_id int not null references jobs(job_id) on delete cascade,
    sentiment_type varchar(100),
    score numeric(3,2),
    sentiment_label varchar(100),
    rationale text,
    created_at timestamp default current_timestamp
);

create table saved_jobs(
    job_id int not null references jobs(job_id) on delete cascade,
    user_id int not null references users(user_id) on delete cascade,
    saved_at timestamp default current_timestamp,
    primary key(job_id,user_id)
);

create table notifications(
    job_id int not null references jobs(job_id) on delete cascade,
    user_id int not null references users(user_id) on delete cascade,
    sent_at timestamp default current_timestamp,
    notification_type varchar(100) not null,
    primary key(job_id,user_id)
);

CREATE TABLE ingestion_logs (
    ingestion_id SERIAL PRIMARY KEY,
    ingestion_source VARCHAR(255),
    status VARCHAR(50),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ingestion_message TEXT
);
