-- Library Management System
-- Database: LIBRARY_DB
-- SQL Server / T-SQL

CREATE DATABASE LIBRARY_DB;
GO

USE LIBRARY_DB;
GO

CREATE TABLE READERS
(
    User_ID INT PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Email VARCHAR(100),
    Phone_No VARCHAR(15),
    Address VARCHAR(100)
);

CREATE TABLE STAFF
(
    Staff_ID INT PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE AUTHENTICATION_SYSTEM
(
    Login_ID VARCHAR(50) PRIMARY KEY,
    Password VARCHAR(50),
    Staff_ID INT,
    FOREIGN KEY (Staff_ID) REFERENCES STAFF(Staff_ID)
);

CREATE TABLE PUBLISHING
(
    Publication_ID INT PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE BOOKS
(
    ISBN VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(100),
    Author VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2),
    Publication_ID INT,
    Staff_ID INT,
    FOREIGN KEY (Publication_ID) REFERENCES PUBLISHING(Publication_ID),
    FOREIGN KEY (Staff_ID) REFERENCES STAFF(Staff_ID)
);

CREATE TABLE REPORTS
(
    Reg_No INT PRIMARY KEY,
    Book_No VARCHAR(20),
    Issue_Return VARCHAR(20),
    User_ID INT,
    Staff_ID INT,
    FOREIGN KEY (User_ID) REFERENCES READERS(User_ID),
    FOREIGN KEY (Staff_ID) REFERENCES STAFF(Staff_ID)
);

CREATE TABLE RESERVE_RETURN
(
    Reserve_ID INT PRIMARY KEY,
    User_ID INT,
    ISBN VARCHAR(20),
    Reserve_Date DATE,
    Due_Date DATE,
    Return_Date DATE,
    FOREIGN KEY (User_ID) REFERENCES READERS(User_ID),
    FOREIGN KEY (ISBN) REFERENCES BOOKS(ISBN)
);

ALTER TABLE READERS
ADD DOB DATE;

ALTER TABLE BOOKS
ADD Edition VARCHAR(20);

-- View table structure
EXEC sp_help 'READERS';

-- View records
SELECT * FROM READERS;
SELECT * FROM STAFF;
SELECT * FROM BOOKS;
SELECT * FROM REPORTS;
SELECT * FROM PUBLISHING;
SELECT * FROM RESERVE_RETURN;

-- Sample data
INSERT INTO READERS
VALUES
(101,'Ram','Patil','ram@gmail.com','9876543210','Mumbai', '2005-01-15'),
(102,'Shyam','Kumar','shyam@gmail.com','9876543211','Pune', '2004-08-21'),
(103,'Riya','Shah','riya@gmail.com','9876543212','Nashik', '2005-03-10');

INSERT INTO STAFF
VALUES
(1,'Amit'),
(2,'Neha');

INSERT INTO AUTHENTICATION_SYSTEM
VALUES
('amit01','1234',1),
('neha01','1234',2);

INSERT INTO PUBLISHING
VALUES
(201,'ABC Publication'),
(202,'XYZ Publication');

INSERT INTO BOOKS
VALUES
('B001','DBMS','virat','Computer',500,201,1,'1st'),
('B002','Java','rohit','Programming',450,202,2,'2nd'),
('B003','Python','mohan','Programming',550,201,1,'1st');

INSERT INTO REPORTS
VALUES
(1,'B001','Issue',101,1),
(2,'B002','Return',102,2),
(3,'B003','Issue',103,1);

INSERT INTO RESERVE_RETURN
VALUES
(1,101,'B001','2026-07-20','2026-07-30',NULL),
(2,102,'B002','2026-07-15','2026-07-25','2026-07-24'),
(3,103,'B003','2026-07-22','2026-08-01',NULL);

-- Update example
UPDATE BOOKS
SET Price = 600
WHERE ISBN = 'B001';

-- Delete example
DELETE FROM REPORTS
WHERE Reg_No = 2;

-- Aggregate functions
SELECT MIN(Price) AS Minimum_Price
FROM BOOKS;

SELECT MAX(Price) AS Maximum_Price
FROM BOOKS;

SELECT COUNT(*) AS Total_Books
FROM BOOKS;

SELECT SUM(Price) AS Total_Book_Price
FROM BOOKS;

SELECT AVG(Price) AS Average_Book_Price
FROM BOOKS;
