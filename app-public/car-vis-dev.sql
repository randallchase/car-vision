DROP DATABASE IF EXISTS car_vis_dev;
CREATE DATABASE car_vis_dev;

\c car_vis_dev;

CREATE TABLE cars_pass (
    ID SERIAL PRIMARY KEY,
    make VARCHAR,
    model VARCHAR,
    color VARCHAR,
    type VARCHAR
);

INSERT INTO cars_pass (make, model, color, type)
    VALUES ('BMW', '2 Series', 'blue', 'car');