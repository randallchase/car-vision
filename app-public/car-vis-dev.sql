DROP DATABASE IF EXISTS car_vis_dev;
CREATE DATABASE car_vis_dev;

\c car_vis_dev;

CREATE TABLE cars_pass (
    ID SERIAL PRIMARY KEY,
    make VARCHAR,
    carModel VARCHAR,
    color VARCHAR,
    vehType VARCHAR,
    confidence DECIMAL
);

INSERT INTO cars_pass (make, carModel, color, vehType, confidence)
    VALUES ('BMW', '2 Series', 'blue', 'car', 0.2728);