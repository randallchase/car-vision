DROP DATABASE IF EXISTS car_vis_dev;
CREATE DATABASE car_vis_dev;

\c car_vis_dev;

CREATE TABLE cars_pass (
    id SERIAL PRIMARY KEY,
    image_id INTEGER,
    make VARCHAR,
    car_model VARCHAR,
    color VARCHAR,
    veh_type VARCHAR,
    confidence DECIMAL
);


CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    dtg TIMESTAMP,
    url VARCHAR
);


CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    make VARCHAR,
    car_model VARCHAR,
    color VARCHAR,
    veh_type VARCHAR,
    ad_category integer
);


CREATE TABLE image_has_cars (
    image_id INTEGER REFERENCES image(id),
    car_id INTEGER REFERENCES cars(id),
    confidence DECIMAL,
    PRIMARY KEY (image_id, car_id)
);


CREATE FUNCTION cars_and_images()
    RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO image_has_cars (image_id) VALUES

INSERT INTO cars_pass (image_id, make, car_model, color, veh_type, confidence)
    VALUES (1, 'BMW', '2 Series', 'blue', 'car', 0.2728),
            (1, 'Ford', 'Mustang', 'red', 'car', 0.9822),
            (1, 'Volkswage', 'GTI', 'red', 'car', 0.7673),
            (1, 'Mazda', 'MX-5 Miata', 'silver/grey', 'car', 0.2643),
            (1, 'Chevrolet', 'Corvette', 'red', 'car', 0.1697),
            (1, 'Porsche', '911', 'red', 'car', 0.3668),
            (1, 'Honda', 'Accord', 'red', 'car', 0.3162),
            (1, 'Chevrolet', 'Camaro', 'green', 'car', 0.675),
            (1, 'Mazda', 'CX-3', 'black', 'suv', 0.138),
            (1, 'Chevrolet', 'Bolt', 'orange', 'car', 0.9694),
            (2, 'Honda', 'Accord', 'black', 'car', 0.6757);