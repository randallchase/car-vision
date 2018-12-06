--Intiate with command line
--psql -f car-vis-dev.sql

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
--
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    dtg TIMESTAMP,
    url VARCHAR
);
--
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    make VARCHAR,
    car_model VARCHAR,
    color VARCHAR,
    veh_type VARCHAR,
    ad_category INTEGER
);
--
CREATE TABLE image_has_cars (
    image_id INTEGER REFERENCES image(id),
    item_id INTEGER,
    car_id INTEGER REFERENCES cars(id),
    confidence DECIMAL,
    PRIMARY KEY (image_id, item_id)
);
--
CREATE TABLE ad_cats (
    id INTEGER PRIMARY KEY,
    description VARCHAR
);
--
CREATE OR REPLACE VIEW image_view AS
SELECT i.id AS id,
c.make as make,
c.car_model AS car_model,
c.color AS color,
c.veh_type AS veh_type,
j.confidence AS confidence,
c.ad_category AS ad_category
FROM image i
JOIN image_has_cars j ON j.image_id = i.id
JOIN cars c ON c.id = j.car_id;
--
CREATE OR REPLACE VIEW image_car_data AS
SELECT i.image_id as image_id,
i.make AS make,
i.car_model AS car_model,
i.color AS color,
i.veh_type AS veh_type,
i.confidence AS confidence,
c.ad_category AS ad_category
FROM cars_pass i
JOIN cars c ON c.make = i.make AND c.car_model = i.car_model AND c.color = i.color;
--
CREATE OR REPLACE VIEW agg_ad_data AS
SELECT ac.cat_count as cat_count,
ac.ad_category AS ad_category,
a.description AS description
from ad_cats a
JOIN (SELECT COUNT(i.ad_category) AS cat_count,
    i.ad_category
    FROM image_car_data i
    GROUP BY ad_category
    ORDER BY cat_count DESC) ac
ON ac.ad_category = a.id;

--

INSERT INTO cars_pass (image_id, make, car_model, color, veh_type, confidence)
    VALUES (1, 'BMW', '2 Series', 'blue', 'car', 0.2728),
            (1, 'Ford', 'Mustang', 'red', 'car', 0.9822),
            (1, 'Volkswagen', 'GTI', 'red', 'car', 0.7673),
            (1, 'Mazda', 'MX-5 Miata', 'silver/grey', 'car', 0.2643),
            (1, 'Chevrolet', 'Corvette', 'red', 'car', 0.1697),
            (1, 'Porsche', '911', 'red', 'car', 0.3668),
            (1, 'Honda', 'Accord', 'red', 'car', 0.3162),
            (1, 'Chevrolet', 'Camaro', 'green', 'car', 0.675),
            (1, 'Mazda', 'CX-3', 'black', 'suv', 0.138),
            (1, 'Chevrolet', 'Bolt', 'orange', 'car', 0.9694),
            (2, 'Honda', 'Accord', 'black', 'car', 0.6757);



INSERT INTO cars (make, car_model, color, veh_type, ad_category)
    VALUES   ('BMW', '2 Series', 'blue', 'car', 1),
             ('Ford', 'Mustang', 'red', 'car', 2),
             ('Volkswagen', 'GTI', 'red', 'car', 2),
             ('Mazda', 'MX-5 Miata', 'silver/grey', 'car', 2),
             ('Chevrolet', 'Corvette', 'red', 'car', 2),
             ('Porsche', '911', 'red', 'car', 2),
             ('Honda', 'Accord', 'red', 'car', 3),
             ('Chevrolet', 'Camaro', 'green', 'car', 2),
             ('Mazda', 'CX-3', 'black', 'suv', 4),
             ('Chevrolet', 'Bolt', 'orange', 'car', 4),
             ('Honda', 'Accord', 'black', 'car', 3);

INSERT INTO ad_cats (id, description)
    VALUES  (1, 'Luxury'),
            (2, 'Sports'),
            (3, 'Family'),
            (4, 'Budget');

