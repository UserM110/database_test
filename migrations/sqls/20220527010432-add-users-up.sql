/* Replace with your SQL commands */
CREATE eTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
   id uuid DEFAULT uuid_generate_v4() PRYIMARY KEY,
   email VARCHAR(30) UNIQUE,
   user_name VARCHAR(30) NOT NULL,
   first_name VARCHAR(20) NOT NULL,
   last_name VARCHAR(20) NOT NULL,
   password VARCHAR(50) NOT NULL
);