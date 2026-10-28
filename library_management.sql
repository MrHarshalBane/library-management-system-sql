-- ==============================================================================
-- LIBRARY MANAGEMENT SYSTEM (LIBRARY_DB)
-- SQL SERVER / T-SQL COMPLETE EXPERIMENTS SUITE (EXPERIMENTS 1 TO 9)
-- ==============================================================================

-- ==============================================================================
-- EXPERIMENT 1: CONSTRUCT ER DIAGRAM FOR A CASE STUDY & DATABASE CREATION
-- ==============================================================================

CREATE DATABASE LIBRARY_DB;
GO

USE LIBRARY_DB;
GO

-- 1. Readers Table
CREATE TABLE READERS
(
    User_ID INT PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Email VARCHAR(100),
    Phone_No VARCHAR(15),
    Address VARCHAR(100),
    DOB DATE
);
GO

-- 2. Staff Table
CREATE TABLE STAFF
(
    Staff_ID INT PRIMARY KEY,
    Name VARCHAR(100)
);
GO

-- 3. Authentication System Table
CREATE TABLE AUTHENTICATION_SYSTEM
(
    Login_ID VARCHAR(50) PRIMARY KEY,
    Password VARCHAR(50),
    Staff_ID INT,
    FOREIGN KEY (Staff_ID) REFERENCES STAFF(Staff_ID)
);
GO

-- 4. Publishing Table
CREATE TABLE PUBLISHING
(
    Publication_ID INT PRIMARY KEY,
    Name VARCHAR(100)
);
GO

-- 5. Books Table
CREATE TABLE BOOKS
(
    ISBN VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(100),
    Author VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2),
    Publication_ID INT,
    Staff_ID INT,
    Edition VARCHAR(20),
    FOREIGN KEY (Publication_ID) REFERENCES PUBLISHING(Publication_ID),
    FOREIGN KEY (Staff_ID) REFERENCES STAFF(Staff_ID)
);
GO

-- 6. Reports Table
CREATE TABLE REPORTS
(
    Reg_No INT PRIMARY KEY,
    Book_No VARCHAR(20),
    Issue_Return VARCHAR(20),
    User_ID INT,
    Staff_ID INT,
    FOREIGN KEY (Book_No) REFERENCES BOOKS(ISBN),
    FOREIGN KEY (User_ID) REFERENCES READERS(User_ID),
    FOREIGN KEY (Staff_ID) REFERENCES STAFF(Staff_ID)
);
GO

-- 7. Reserve & Return Table
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
GO

-- Sample Seed Data
INSERT INTO READERS (User_ID, First_Name, Last_Name, Email, Phone_No, Address, DOB) VALUES
(101, 'Ram', 'Patil', 'ram@gmail.com', '9876543210', 'Mumbai', '2005-01-15'),
(102, 'Shyam', 'Kumar', 'shyam@gmail.com', '9876543211', 'Pune', '2004-08-21'),
(103, 'Riya', 'Shah', 'riya@gmail.com', '9876543212', 'Nashik', '2005-03-10');

INSERT INTO STAFF (Staff_ID, Name) VALUES
(1, 'Amit'),
(2, 'Neha');

INSERT INTO AUTHENTICATION_SYSTEM (Login_ID, Password, Staff_ID) VALUES
('amit01', '1234', 1),
('neha01', '1234', 2);

INSERT INTO PUBLISHING (Publication_ID, Name) VALUES
(201, 'ABC Publication'),
(202, 'XYZ Publication');

INSERT INTO BOOKS (ISBN, Title, Author, Category, Price, Publication_ID, Staff_ID, Edition) VALUES
('B001', 'DBMS', 'virat', 'Computer', 500, 201, 1, '1st'),
('B002', 'Java', 'rohit', 'Programming', 450, 202, 2, '2nd'),
('B003', 'Python', 'mohan', 'Programming', 550, 201, 1, '1st');

INSERT INTO REPORTS (Reg_No, Book_No, Issue_Return, User_ID, Staff_ID) VALUES
(1, 'B001', 'Issue', 101, 1),
(2, 'B002', 'Return', 102, 2),
(3, 'B003', 'Issue', 103, 1);

INSERT INTO RESERVE_RETURN (Reserve_ID, User_ID, ISBN, Reserve_Date, Due_Date, Return_Date) VALUES
(1, 101, 'B001', '2026-07-20', '2026-07-30', NULL),
(2, 102, 'B002', '2026-07-15', '2026-07-25', '2026-07-24'),
(3, 103, 'B003', '2026-07-22', '2026-08-01', NULL);
GO

-- Display table records
SELECT * FROM READERS;
SELECT * FROM STAFF;
SELECT * FROM BOOKS;
SELECT * FROM REPORTS;
SELECT * FROM AUTHENTICATION_SYSTEM;
SELECT * FROM PUBLISHING;
SELECT * FROM RESERVE_RETURN;
GO

-- ==============================================================================
-- EXPERIMENT 3: IMPLEMENTATION OF DDL COMMANDS WITH CONSTRAINTS
-- ==============================================================================

USE LIBRARY_DB;
GO

-- 1. CREATE COMMAND
CREATE TABLE DEPARTMENT
(
    Dept_ID INT PRIMARY KEY,
    Dept_Name VARCHAR(50) NOT NULL
);
GO

-- 2. ALTER COMMAND: MODIFY COLUMN
ALTER TABLE STAFF
ALTER COLUMN Name VARCHAR(100);
GO

-- 3. UNIQUE CONSTRAINT
ALTER TABLE READERS
ADD CONSTRAINT UQ_READERS_EMAIL UNIQUE (Email);
GO

-- 4. CHECK CONSTRAINT
ALTER TABLE BOOKS
ADD CONSTRAINT CK_BOOKS_PRICE CHECK (Price >= 0);
GO

-- 5. DEFAULT CONSTRAINT
ALTER TABLE RESERVE_RETURN
ADD CONSTRAINT DF_RESERVE_DATE
DEFAULT GETDATE() FOR Reserve_Date;
GO

-- 6. DESCRIBE TABLE STRUCTURE
EXEC sp_help 'READERS';
EXEC sp_help 'BOOKS';
EXEC sp_help 'RESERVE_RETURN';
GO

-- 7. RENAME TABLE
EXEC sp_rename 'DEPARTMENT', 'DEPARTMENT_DETAILS';
GO

-- 8. TRUNCATE / DROP TABLE (Demonstration)
-- TRUNCATE TABLE DEPARTMENT_DETAILS;
-- DROP TABLE DEPARTMENT_DETAILS;
GO

-- Display table descriptions
EXEC sp_help 'READERS';
EXEC sp_help 'BOOKS';
EXEC sp_help 'RESERVE_RETURN';
EXEC sp_help 'DEPARTMENT_DETAILS';
GO

-- ==============================================================================
-- EXPERIMENT 4: DML AND DCL COMMANDS
-- ==============================================================================

USE LIBRARY_DB;
GO

-- 1. INSERT
INSERT INTO READERS (User_ID, First_Name, Last_Name, Email, Phone_No, Address, DOB)
VALUES (104, 'Karan', 'Shah', 'karan@gmail.com', '9876543213', 'Thane', '2005-06-12');

-- 2. SELECT
SELECT * FROM READERS;
SELECT * FROM BOOKS;

-- 3. UPDATE
UPDATE READERS
SET Address = 'Nagpur'
WHERE User_ID = 104;

-- 4. DELETE
DELETE FROM READERS
WHERE User_ID = 104;

-- 5. DCL: GRANT and REVOKE (Sample syntax for existing database user)
-- GRANT SELECT ON OBJECT::dbo.BOOKS TO LibraryUser;
-- REVOKE SELECT ON OBJECT::dbo.BOOKS FROM LibraryUser;
GO

-- ==============================================================================
-- EXPERIMENT 5: QUERIES USING SET OPERATORS AND STRING FUNCTIONS
-- ==============================================================================

USE LIBRARY_DB;
GO

-- SET OPERATORS
-- 1. UNION
SELECT First_Name AS Person_Name FROM READERS
UNION
SELECT Name FROM STAFF;

-- 2. INTERSECT
SELECT ISBN FROM BOOKS
INTERSECT
SELECT Book_No FROM REPORTS;

-- 3. EXCEPT
SELECT First_Name AS Person_Name FROM READERS
EXCEPT
SELECT Name FROM STAFF;

-- STRING FUNCTIONS
-- 1. ASCII
SELECT First_Name, ASCII(First_Name) AS ASCII_Value FROM READERS;

-- 2. CHAR
SELECT CHAR(82) AS Character_Value;

-- 3. CONCAT
SELECT CONCAT(First_Name, ' ', Last_Name) AS Full_Name FROM READERS;

-- 4. UPPER
SELECT UPPER(First_Name) AS Upper_Name FROM READERS;

-- 5. LOWER
SELECT LOWER(Author) AS Lower_Author FROM BOOKS;

-- 6. LEN
SELECT Title, LEN(Title) AS Title_Length FROM BOOKS;

-- 7. TRIM
SELECT TRIM(First_Name) AS Trimmed_Name FROM READERS;

-- 8. REPLACE
SELECT Category, REPLACE(Category, 'Programming', 'Coding') AS New_Category FROM BOOKS;
GO

-- ==============================================================================
-- EXPERIMENT 6: AGGREGATE FUNCTIONS
-- ==============================================================================

USE LIBRARY_DB;
GO

-- Minimum book price
SELECT MIN(Price) AS Minimum_Price FROM BOOKS;

-- Maximum book price
SELECT MAX(Price) AS Maximum_Price FROM BOOKS;

-- Total price of all books
SELECT SUM(Price) AS Total_Price FROM BOOKS;

-- Average book price
SELECT AVG(Price) AS Average_Price FROM BOOKS;

-- Total number of books
SELECT COUNT(*) AS Total_Books FROM BOOKS;

-- Category-wise count
SELECT Category, COUNT(*) AS Number_Of_Books
FROM BOOKS
GROUP BY Category;

-- HAVING Clause
SELECT Category, AVG(Price) AS Average_Price
FROM BOOKS
GROUP BY Category
HAVING AVG(Price) > 450;
GO

-- ==============================================================================
-- EXPERIMENT 7: JOIN AND NESTED QUERIES
-- ==============================================================================

USE LIBRARY_DB;
GO

-- JOIN QUERIES
-- 1. Books with publisher names (INNER JOIN)
SELECT B.ISBN, B.Title, P.Name AS Publisher
FROM BOOKS B
INNER JOIN PUBLISHING P ON B.Publication_ID = P.Publication_ID;

-- 2. Books with staff names (INNER JOIN)
SELECT B.Title, S.Name AS Staff_Name
FROM BOOKS B
INNER JOIN STAFF S ON B.Staff_ID = S.Staff_ID;

-- 3. Reader reservation details (MULTI-TABLE INNER JOIN)
SELECT R.First_Name, R.Last_Name, B.Title,
       RR.Reserve_Date, RR.Due_Date, RR.Return_Date
FROM READERS R
INNER JOIN RESERVE_RETURN RR ON R.User_ID = RR.User_ID
INNER JOIN BOOKS B ON RR.ISBN = B.ISBN;

-- 4. Readers with reservation status (LEFT JOIN)
SELECT R.First_Name, R.Last_Name, RR.ISBN
FROM READERS R
LEFT JOIN RESERVE_RETURN RR ON R.User_ID = RR.User_ID;

-- NESTED QUERIES
-- 5. Books costing more than average price
SELECT Title, Price
FROM BOOKS
WHERE Price > (SELECT AVG(Price) FROM BOOKS);

-- 6. Readers who reserved books (IN subquery)
SELECT First_Name, Last_Name
FROM READERS
WHERE User_ID IN (SELECT User_ID FROM RESERVE_RETURN);

-- 7. Most expensive book
SELECT Title, Price
FROM BOOKS
WHERE Price = (SELECT MAX(Price) FROM BOOKS);
GO

-- ==============================================================================
-- EXPERIMENT 8: DATABASE AUDIT TRIGGER (CLEAN SINGLE AUDIT TRIGGER)
-- ==============================================================================

USE LIBRARY_DB;
GO

-- Create Audit Table for Reader Activity Tracking
CREATE TABLE READERS_AUDIT
(
    Audit_ID INT IDENTITY(1,1) PRIMARY KEY,
    User_ID INT,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Email VARCHAR(100),
    Phone_No VARCHAR(15),
    Address VARCHAR(100),
    Audit_Action VARCHAR(20),
    Audit_Timestamp DATETIME DEFAULT GETDATE()
);
GO

-- Comprehensive trigger tracking changes cleanly
CREATE OR ALTER TRIGGER TRG_READERS_AUDIT
ON READERS
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Handle INSERT and UPDATE
    IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        IF EXISTS (SELECT 1 FROM deleted)
        BEGIN
            -- UPDATE: record updated state
            INSERT INTO READERS_AUDIT (User_ID, First_Name, Last_Name, Email, Phone_No, Address, Audit_Action)
            SELECT User_ID, First_Name, Last_Name, Email, Phone_No, Address, 'UPDATE'
            FROM inserted;
        END
        ELSE
        BEGIN
            -- INSERT: record newly added reader
            INSERT INTO READERS_AUDIT (User_ID, First_Name, Last_Name, Email, Phone_No, Address, Audit_Action)
            SELECT User_ID, First_Name, Last_Name, Email, Phone_No, Address, 'INSERT'
            FROM inserted;
        END
    END
    -- Handle DELETE
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        INSERT INTO READERS_AUDIT (User_ID, First_Name, Last_Name, Email, Phone_No, Address, Audit_Action)
        SELECT User_ID, First_Name, Last_Name, Email, Phone_No, Address, 'DELETE'
        FROM deleted;
    END
END;
GO

-- Test reader audit trigger
INSERT INTO READERS (User_ID, First_Name, Last_Name, Email, Phone_No, Address, DOB)
VALUES (105, 'Test', 'Reader', 'testreader@gmail.com', '9876543214', 'Mumbai', '2000-01-01');

UPDATE READERS SET Address = 'Pune' WHERE User_ID = 105;

DELETE FROM READERS WHERE User_ID = 105;

-- Check audit logs
SELECT * FROM READERS_AUDIT;
GO

-- ==============================================================================
-- EXPERIMENT 9: STORED PROCEDURES
-- ==============================================================================

USE LIBRARY_DB;
GO

-- 1. Display Book Details
CREATE OR ALTER PROCEDURE dbo.GetBookDetails
AS
BEGIN
    SET NOCOUNT ON;

    SELECT B.ISBN, B.Title, B.Author, B.Category,
           B.Price, B.Edition, P.Name AS PublisherName
    FROM dbo.BOOKS B
    JOIN dbo.PUBLISHING P ON B.Publication_ID = P.Publication_ID
    ORDER BY B.Title;
END;
GO

-- 2. Register a Reader
CREATE OR ALTER PROCEDURE dbo.RegisterReader
    @User_ID INT,
    @First_Name VARCHAR(50),
    @Last_Name VARCHAR(50),
    @Email VARCHAR(100),
    @Phone_No VARCHAR(15),
    @Address VARCHAR(100),
    @DOB DATE
AS
BEGIN
    SET NOCOUNT ON;

    IF @First_Name IS NULL OR LTRIM(RTRIM(@First_Name)) = ''
    BEGIN
        RAISERROR('First name is required.', 16, 1);
        RETURN;
    END;

    IF @Email IS NULL OR LTRIM(RTRIM(@Email)) = ''
    BEGIN
        RAISERROR('Email is required.', 16, 1);
        RETURN;
    END;

    INSERT INTO dbo.READERS (User_ID, First_Name, Last_Name, Email, Phone_No, Address, DOB)
    VALUES (@User_ID, @First_Name, @Last_Name, @Email, @Phone_No, @Address, @DOB);

    PRINT 'Reader registered successfully.';
END;
GO

-- 3. Add a Book
CREATE OR ALTER PROCEDURE dbo.AddBook
    @ISBN VARCHAR(20),
    @Title VARCHAR(100),
    @Author VARCHAR(100),
    @Category VARCHAR(50),
    @Price DECIMAL(10,2),
    @PublicationID INT,
    @StaffID INT,
    @Edition VARCHAR(20) = '1st'
AS
BEGIN
    SET NOCOUNT ON;

    IF @Price < 0
    BEGIN
        RAISERROR('Price cannot be negative.', 16, 1);
        RETURN;
    END;

    IF NOT EXISTS (SELECT 1 FROM dbo.PUBLISHING WHERE Publication_ID = @PublicationID)
    BEGIN
        RAISERROR('Publisher does not exist.', 16, 1);
        RETURN;
    END;

    INSERT INTO dbo.BOOKS (ISBN, Title, Author, Category, Price, Publication_ID, Staff_ID, Edition)
    VALUES (@ISBN, @Title, @Author, @Category, @Price, @PublicationID, @StaffID, @Edition);

    SELECT 'Book added successfully.' AS Message;
END;
GO

-- 4. Reserve / Issue a Book
CREATE OR ALTER PROCEDURE dbo.ReserveBook
    @ReserveID INT,
    @UserID INT,
    @ISBN VARCHAR(20),
    @StaffID INT,
    @DueDate DATE
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    IF NOT EXISTS (SELECT 1 FROM dbo.READERS WHERE User_ID = @UserID)
    BEGIN
        RAISERROR('Reader does not exist.', 16, 1);
        RETURN;
    END;

    IF NOT EXISTS (SELECT 1 FROM dbo.BOOKS WHERE ISBN = @ISBN)
    BEGIN
        RAISERROR('Book does not exist.', 16, 1);
        RETURN;
    END;

    IF NOT EXISTS (SELECT 1 FROM dbo.STAFF WHERE Staff_ID = @StaffID)
    BEGIN
        RAISERROR('Staff member does not exist.', 16, 1);
        RETURN;
    END;

    IF @DueDate < CONVERT(DATE, GETDATE())
    BEGIN
        RAISERROR('Due date cannot be in the past.', 16, 1);
        RETURN;
    END;

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO dbo.RESERVE_RETURN (Reserve_ID, User_ID, ISBN, Reserve_Date, Due_Date, Return_Date)
        VALUES (@ReserveID, @UserID, @ISBN, CONVERT(DATE, GETDATE()), @DueDate, NULL);

        -- Generate Next Reg_No for REPORTS
        DECLARE @NextRegNo INT = ISNULL((SELECT MAX(Reg_No) FROM dbo.REPORTS), 0) + 1;

        INSERT INTO dbo.REPORTS (Reg_No, Book_No, Issue_Return, User_ID, Staff_ID)
        VALUES (@NextRegNo, @ISBN, 'Issue', @UserID, @StaffID);

        COMMIT TRANSACTION;
        SELECT 'Book reserved/issued successfully.' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- 5. Return a Book
CREATE OR ALTER PROCEDURE dbo.ReturnBook
    @ReserveID INT,
    @StaffID INT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    IF NOT EXISTS (SELECT 1 FROM dbo.STAFF WHERE Staff_ID = @StaffID)
    BEGIN
        RAISERROR('Staff member does not exist.', 16, 1);
        RETURN;
    END;

    IF NOT EXISTS (SELECT 1 FROM dbo.RESERVE_RETURN WHERE Reserve_ID = @ReserveID AND Return_Date IS NULL)
    BEGIN
        RAISERROR('Active reservation not found, or book has already been returned.', 16, 1);
        RETURN;
    END;

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE dbo.RESERVE_RETURN
        SET Return_Date = CONVERT(DATE, GETDATE())
        WHERE Reserve_ID = @ReserveID AND Return_Date IS NULL;

        DECLARE @BookISBN VARCHAR(20);
        DECLARE @UserID INT;
        SELECT @BookISBN = ISBN, @UserID = User_ID FROM dbo.RESERVE_RETURN WHERE Reserve_ID = @ReserveID;

        DECLARE @NextRegNo INT = ISNULL((SELECT MAX(Reg_No) FROM dbo.REPORTS), 0) + 1;

        INSERT INTO dbo.REPORTS (Reg_No, Book_No, Issue_Return, User_ID, Staff_ID)
        VALUES (@NextRegNo, @BookISBN, 'Return', @UserID, @StaffID);

        COMMIT TRANSACTION;
        SELECT 'Book returned successfully.' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- 6. Display Reader History
CREATE OR ALTER PROCEDURE dbo.GetReaderHistory
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT R.Reserve_ID, R.User_ID, B.ISBN, B.Title,
           R.Reserve_Date, R.Due_Date, R.Return_Date
    FROM dbo.RESERVE_RETURN R
    JOIN dbo.BOOKS B ON R.ISBN = B.ISBN
    WHERE R.User_ID = @UserID
    ORDER BY R.Reserve_Date DESC;
END;
GO

-- 7. Generate Library Report
CREATE OR ALTER PROCEDURE dbo.GetLibraryReport
AS
BEGIN
    SET NOCOUNT ON;

    SELECT RP.Reg_No, RP.Book_No, B.Title,
           RP.Issue_Return, RP.User_ID,
           CONCAT(R.First_Name, ' ', R.Last_Name) AS ReaderName,
           S.Name AS StaffName
    FROM dbo.REPORTS RP
    JOIN dbo.BOOKS B ON RP.Book_No = B.ISBN
    JOIN dbo.READERS R ON RP.User_ID = R.User_ID
    JOIN dbo.STAFF S ON RP.Staff_ID = S.Staff_ID
    ORDER BY RP.Reg_No DESC;
END;
GO

-- 8. Authenticate Staff
CREATE OR ALTER PROCEDURE dbo.AuthenticateStaff
    @LoginID VARCHAR(50),
    @Password VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM dbo.AUTHENTICATION_SYSTEM WHERE Login_ID = @LoginID AND Password = @Password)
    BEGIN
        SELECT S.Staff_ID, S.Name, A.Login_ID, 'Login successful' AS Message
        FROM dbo.AUTHENTICATION_SYSTEM A
        JOIN dbo.STAFF S ON A.Staff_ID = S.Staff_ID
        WHERE A.Login_ID = @LoginID;
    END
    ELSE
    BEGIN
        SELECT 'Invalid login ID or password' AS Message;
    END;
END;
GO
