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
            (1, 'Chevrolet', 'Bolt', 'orange', 'car', 0.9694);