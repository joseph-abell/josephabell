---
title: SQL Cheatsheet
date: '2019-07-15T21:40:00.000Z'
tags: 'SQL'
sticky: false
---

SQL is a fantastic declarative programming language that I really enjoy using. For my own sanity, here is a quick cheatsheet.

## Terminology

* Create - Creates a new thing. Mostly a new database, table.
* Alter - Edit a table or column if already created.
* Insert - Creates an item of an already createed thing. For example, if you have a table, insert a new row of the table.
* Drop - Delete a database, table, column.


## Databases

* Create - `CREATE DATABASE clowns`;
* Drop / Delete - `DROP DATABASE clowns`;

## Tables

* Create - `CREATE TABLE Wig (WigID int PRIMARY KEY CLUSTERED, Name varchar);`
* Delete - `DROP TABLE Wig;`
* Add Column - `ALTER TABLE Wig ADD COLUMN Colour varchar;`

## Row

* Select All - `SELECT * FROM Wig;`
* Select just the colour column - `SELECT Colour from Wig;`
* Select only black wigs - `SELECT * from Wig where Colour='black'`;
* Add new row - `INSERT INTO Wig (WigId, Name, Colour) VALUES (1, 'Kurly', 'orange');`
* remove row - `DELETE FROM Wig WHERE WigID = 2`;
* update row - `UPDATE WIG SET Name='Shiny' WHERE WigID = 3;`

## Querying from multiple tables

```sql
SELECT first_name, last_name, actor.actor_id, film.film_id, title, description
FROM actor
INNER JOIN film_actor ON actor.actor_id = film_actor.actor_id
INNER JOIN film ON film.film_id = film_actor.film_id;
```
