
USE db;

CREATE TABLE table_sections(
  id INT NOT NULL AUTO_INCREMENT,
  deleted BOOLEAN NOT NULL DEFAULT 0,
  name VARCHAR(40) NOT NULL,
  description VARCHAR(256) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE table_items(
  id INT NOT NULL AUTO_INCREMENT,
  deleted BOOLEAN NOT NULL DEFAULT 0,
  description VARCHAR(256) NOT NULL,
  name VARCHAR(20) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  section_id INT NOT NULL,
  INDEX section_index (section_id),
  FOREIGN KEY (section_id) REFERENCES table_sections(id),
  PRIMARY KEY (id)
);

CREATE TABLE table_modifiers(
  id INT NOT NULL AUTO_INCREMENT,
  deleted BOOLEAN NOT NULL DEFAULT 0,
  description VARCHAR(256) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE table_items_x_modifiers(
  id INT NOT NULL AUTO_INCREMENT,
  deleted BOOLEAN NOT NULL DEFAULT 0,
  item_id INT NOT NULL,
  INDEX item_index (item_id),
  FOREIGN KEY (item_id) REFERENCES table_items(id),
  modifier_id INT NOT NULL,
  INDEX modifier_index (modifier_id),
  FOREIGN KEY (modifier_id) REFERENCES table_modifiers(id),
  PRIMARY KEY (id)
);
