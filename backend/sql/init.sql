CREATE DATABASE itinerary;

\c itinerary

CREATE TYPE user_role as ENUM ('admin', 'user');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role user_role DEFAULT 'user'
);

CREATE TYPE category as ENUM ('beach', 'temple', 'museum');

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  longitude DECIMAL DEFAULT 0,
  latitude DECIMAL DEFAULT 0,
  description TEXT,
  image_url VARCHAR UNIQUE,
  type category,
  address TEXT UNIQUE,
  city TEXT,
  district TEXT,
  country TEXT DEFAULT 'Sri Lanka',
  rating DECIMAL(2, 1),
  entry_fee DECIMAL(10, 2),
  contact_number TEXT,
  website TEXT,
  opening_hours TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wish_lists (
  user_id INTEGER,
  location_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_users_wish_lists FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_location_wish_lists FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE bookings (
  user_id INTEGER,
  location_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT fk_users_bookings FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_location_bookings FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TYPE payment_method as ENUM ('slip', 'card');

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  location_id INTEGER,
  amount DECIMAL(10, 2), 
  method payment_method,
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT fk_users_payments FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_location_payments FOREIGN KEY (location_id) REFERENCES locations (id)
);