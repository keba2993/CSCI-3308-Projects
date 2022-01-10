DROP TABLE IF EXISTS meal_reviews CASCADE;
CREATE TABLE IF NOT EXISTS meal_reviews (
  id SERIAL PRIMARY KEY,       /* id of meal */
  meal_name VARCHAR(50) NOT NULL,   /* name of meal */
  review VARCHAR(300),      /* review text */
  review_date DATE NOT NULL        /* Date of review */  
);

INSERT INTO meal_reviews(meal_name, review, review_date)
VALUES('Pancakes', 'these pancakes were so delicious and fun to make!','20210831'),
('Spicy Arrabiata Penne', 'not bad but there are better recipes!', '20210908')
;