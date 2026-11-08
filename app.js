// LIBRARY_DB In-Memory Relational Engine & Chat Assistant
document.addEventListener('DOMContentLoaded', () => {
  // Complete LIBRARY_DB database relations matching library_management.sql
  const DB = {
    BOOKS: [
      { ISBN: 'B001', Title: 'DBMS', Author: 'virat', Category: 'Computer', Price: 600, Publication_ID: 201, Staff_ID: 1, Edition: '1st' },
      { ISBN: 'B002', Title: 'Java', Author: 'rohit', Category: 'Programming', Price: 450, Publication_ID: 202, Staff_ID: 2, Edition: '2nd' },
      { ISBN: 'B003', Title: 'Python', Author: 'mohan', Category: 'Programming', Price: 550, Publication_ID: 201, Staff_ID: 1, Edition: '1st' }
    ],
    READERS: [
      { User_ID: 101, First_Name: 'Ram', Last_Name: 'Patil', Email: 'ram@gmail.com', Phone_No: '9876543210', Address: 'Mumbai', DOB: '2005-01-15' },
      { User_ID: 102, First_Name: 'Shyam', Last_Name: 'Kumar', Email: 'shyam@gmail.com', Phone_No: '9876543211', Address: 'Pune', DOB: '2004-08-21' },
      { User_ID: 103, First_Name: 'Riya', Last_Name: 'Shah', Email: 'riya@gmail.com', Phone_No: '9876543212', Address: 'Nashik', DOB: '2005-03-10' }
    ],
    RESERVE_RETURN: [
      { Reserve_ID: 1, User_ID: 101, ISBN: 'B001', Reserve_Date: '2026-07-20', Due_Date: '2026-07-30', Return_Date: 'Pending' },
      { Reserve_ID: 2, User_ID: 102, ISBN: 'B002', Reserve_Date: '2026-07-15', Due_Date: '2026-07-25', Return_Date: '2026-07-24' },
      { Reserve_ID: 3, User_ID: 103, ISBN: 'B003', Reserve_Date: '2026-07-22', Due_Date: '2026-08-01', Return_Date: 'Pending' }
    ],
    STAFF: [
      { Staff_ID: 1, Name: 'Amit' },
      { Staff_ID: 2, Name: 'Neha' }
    ],
    PUBLISHING: [
      { Publication_ID: 201, Name: 'ABC Publication' },
      { Publication_ID: 202, Name: 'XYZ Publication' }
    ],
    REPORTS: [
      { Reg_No: 1, Book_No: 'B001', Issue_Return: 'Issue', User_ID: 101, Staff_ID: 1 },
      { Reg_No: 2, Book_No: 'B002', Issue_Return: 'Return', User_ID: 102, Staff_ID: 2 },
      { Reg_No: 3, Book_No: 'B003', Issue_Return: 'Issue', User_ID: 103, Staff_ID: 1 }
    ]
  };

  // Structured SQL Experiments Code
  const SQL_EXPERIMENTS = {
    EXP1: `-- ==============================================================================
-- EXPERIMENT 1: CONSTRUCT ER DIAGRAM FOR A CASE STUDY & DATABASE CREATION
-- ==============================================================================

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
    Address VARCHAR(100),
    DOB DATE
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
    Edition VARCHAR(20),
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
    FOREIGN KEY (Book_No) REFERENCES BOOKS(ISBN),
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
GO

-- Display table structures
SELECT * FROM READERS;
SELECT * FROM STAFF;
SELECT * FROM BOOKS;
SELECT * FROM REPORTS;
SELECT * FROM AUTHENTICATION_SYSTEM;
SELECT * FROM PUBLISHING;
SELECT * FROM RESERVE_RETURN;
GO`,

    EXP3: `-- ==============================================================================
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

-- 8. TRUNCATE / DROP DEMO
-- TRUNCATE TABLE DEPARTMENT_DETAILS;
-- DROP TABLE DEPARTMENT_DETAILS;
GO

EXEC sp_help 'DEPARTMENT_DETAILS';
GO`,

    EXP4: `-- ==============================================================================
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

-- 5. DCL: GRANT and REVOKE (for LibraryUser)
-- GRANT SELECT ON OBJECT::dbo.BOOKS TO LibraryUser;
-- REVOKE SELECT ON OBJECT::dbo.BOOKS FROM LibraryUser;
GO`,

    EXP5: `-- ==============================================================================
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
GO`,

    EXP6: `-- ==============================================================================
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

-- HAVING
SELECT Category, AVG(Price) AS Average_Price
FROM BOOKS
GROUP BY Category
HAVING AVG(Price) > 450;
GO`,

    EXP7: `-- ==============================================================================
-- EXPERIMENT 7: JOIN AND NESTED QUERIES
-- ==============================================================================

USE LIBRARY_DB;
GO

-- 1. Books with publisher names (INNER JOIN)
SELECT B.ISBN, B.Title, P.Name AS Publisher
FROM BOOKS B
INNER JOIN PUBLISHING P ON B.Publication_ID = P.Publication_ID;

-- 2. Books with staff names (INNER JOIN)
SELECT B.Title, S.Name AS Staff_Name
FROM BOOKS B
INNER JOIN STAFF S ON B.Staff_ID = S.Staff_ID;

-- 3. Reader reservation details (INNER JOIN)
SELECT R.First_Name, R.Last_Name, B.Title,
       RR.Reserve_Date, RR.Due_Date, RR.Return_Date
FROM READERS R
INNER JOIN RESERVE_RETURN RR ON R.User_ID = RR.User_ID
INNER JOIN BOOKS B ON RR.ISBN = B.ISBN;

-- 4. LEFT JOIN
SELECT R.First_Name, R.Last_Name, RR.ISBN
FROM READERS R
LEFT JOIN RESERVE_RETURN RR ON R.User_ID = RR.User_ID;

-- NESTED QUERIES
-- 5. Books costing more than average price
SELECT Title, Price
FROM BOOKS
WHERE Price > (SELECT AVG(Price) FROM BOOKS);

-- 6. Readers who reserved books
SELECT First_Name, Last_Name
FROM READERS
WHERE User_ID IN (SELECT User_ID FROM RESERVE_RETURN);

-- 7. Most expensive book
SELECT Title, Price
FROM BOOKS
WHERE Price = (SELECT MAX(Price) FROM BOOKS);
GO`,

    EXP8: `-- ==============================================================================
-- EXPERIMENT 8: DATABASE AUDIT TRIGGER (UNIFIED & CLEAN)
-- ==============================================================================

USE LIBRARY_DB;
GO

-- Audit table to capture INSERT, UPDATE, DELETE changes
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

-- Single clean consolidated trigger (eliminates redundant separate triggers)
CREATE OR ALTER TRIGGER TRG_READERS_AUDIT
ON READERS
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Handle INSERT & UPDATE
    IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        IF EXISTS (SELECT 1 FROM deleted)
        BEGIN
            INSERT INTO READERS_AUDIT (User_ID, First_Name, Last_Name, Email, Phone_No, Address, Audit_Action)
            SELECT User_ID, First_Name, Last_Name, Email, Phone_No, Address, 'UPDATE'
            FROM inserted;
        END
        ELSE
        BEGIN
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

-- Trigger verification test
INSERT INTO READERS (User_ID, First_Name, Last_Name, Email, Phone_No, Address, DOB)
VALUES (105, 'Test', 'Reader', 'testreader@gmail.com', '9876543214', 'Mumbai', '2000-01-01');

UPDATE READERS SET Address = 'Pune' WHERE User_ID = 105;

DELETE FROM READERS WHERE User_ID = 105;

SELECT * FROM READERS_AUDIT;
GO`,

    EXP9: `-- ==============================================================================
-- EXPERIMENT 9: STORED PROCEDURES (CORRELATED WITH LIBRARY_DB)
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
GO`
  };

  // Full merged script
  SQL_EXPERIMENTS.ALL = Object.values(SQL_EXPERIMENTS).join('\n\n');

  // DOM Elements
  const btnViewTables = document.getElementById('btn-view-tables');
  const btnViewPortal = document.getElementById('btn-view-portal');
  const btnViewDiff = document.getElementById('btn-view-diff');
  const btnViewCode = document.getElementById('btn-view-code');

  const tableViewContainer = document.getElementById('tableViewContainer');
  const portalViewContainer = document.getElementById('portalViewContainer');
  const fileDiffContainer = document.getElementById('fileDiffContainer');
  const sqlCodeViewer = document.getElementById('sqlCodeViewer');
  const modeBadge = document.getElementById('mode-badge');

  const expNavPills = document.getElementById('expNavPills');
  const sqlCodeDisplay = document.getElementById('sqlCodeDisplay');
  const codeSectionTitle = document.getElementById('codeSectionTitle');
  const btnCopyCode = document.getElementById('btnCopyCode');
  const copyBtnText = document.getElementById('copyBtnText');

  const tableTabs = document.querySelectorAll('.tab-btn');
  const tableHead = document.getElementById('sql-table-head');
  const tableBody = document.getElementById('sql-table-body');
  const activeTableTitle = document.getElementById('active-table-title');
  const activeTableCount = document.getElementById('active-table-count');

  const messagesArea = document.getElementById('messagesArea');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const queryChips = document.getElementById('queryChips');
  const btnClearChat = document.getElementById('btn-clear-chat');

  // Stats indicators
  const statBooks = document.getElementById('stat-books-count');
  const statReaders = document.getElementById('stat-readers-count');
  const statStaff = document.getElementById('stat-staff-count');
  const statReserve = document.getElementById('stat-reserve-count');

  let currentActiveTable = 'BOOKS';
  let currentActiveStaffId = 1;
  let activePortalTab = 'books';
  let diffHasRunOnce = false;

  // Sync all header and portal stat counts
  function updateAllStats() {
    if (statBooks) statBooks.textContent = DB.BOOKS.length;
    if (statReaders) statReaders.textContent = DB.READERS.length;
    if (statStaff) statStaff.textContent = DB.STAFF.length;
    if (statReserve) statReserve.textContent = DB.RESERVE_RETURN.length;

    const portalBooksBadge = document.getElementById('portal-books-badge');
    const portalReadersBadge = document.getElementById('portal-readers-badge');
    const portalCircBadge = document.getElementById('portal-circ-badge');
    const portalReportsBadge = document.getElementById('portal-reports-badge');

    if (portalBooksBadge) portalBooksBadge.textContent = DB.BOOKS.length;
    if (portalReadersBadge) portalReadersBadge.textContent = DB.READERS.length;
    if (portalCircBadge) portalCircBadge.textContent = DB.RESERVE_RETURN.length;
    if (portalReportsBadge) portalReportsBadge.textContent = DB.REPORTS.length;

    // Circulation status counters
    const activeLoans = DB.RESERVE_RETURN.filter(r => r.Return_Date === 'Pending' || !r.Return_Date).length;
    const returnedLoans = DB.RESERVE_RETURN.length - activeLoans;

    const elActive = document.getElementById('circ-active-count');
    const elReturned = document.getElementById('circ-returned-count');
    const elAllBadge = document.getElementById('circ-all-badge');
    const elPendingBadge = document.getElementById('circ-pending-badge');
    const elDoneBadge = document.getElementById('circ-done-badge');

    if (elActive) elActive.textContent = activeLoans;
    if (elReturned) elReturned.textContent = returnedLoans;
    if (elAllBadge) elAllBadge.textContent = DB.RESERVE_RETURN.length;
    if (elPendingBadge) elPendingBadge.textContent = activeLoans;
    if (elDoneBadge) elDoneBadge.textContent = returnedLoans;

    updateAggregates();
  }

  // Toast Notification System
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;

    let icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';
    if (type === 'error') icon = 'fa-circle-xmark';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span class="toast-text">${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // View Switcher Handlers
  function switchView(viewName) {
    [btnViewTables, btnViewPortal, btnViewDiff, btnViewCode].forEach(b => {
      if (b) b.classList.remove('active');
    });
    [tableViewContainer, portalViewContainer, fileDiffContainer, sqlCodeViewer].forEach(p => {
      if (p) {
        p.classList.add('hidden');
        p.classList.remove('active');
      }
    });

    if (viewName === 'tables') {
      if (btnViewTables) btnViewTables.classList.add('active');
      if (tableViewContainer) tableViewContainer.classList.remove('hidden');
      if (modeBadge) modeBadge.textContent = 'Database Tables';
      renderTable(currentActiveTable);
    } else if (viewName === 'portal') {
      if (btnViewPortal) btnViewPortal.classList.add('active');
      if (portalViewContainer) portalViewContainer.classList.remove('hidden');
      if (modeBadge) modeBadge.textContent = 'Employee Management Portal';
      renderPortalData();
    } else if (viewName === 'diff') {
      if (btnViewDiff) btnViewDiff.classList.add('active');
      if (fileDiffContainer) fileDiffContainer.classList.remove('hidden');
      if (modeBadge) modeBadge.textContent = 'File & SQL Comparison Diff Engine';
      if (!diffHasRunOnce) {
        loadDiffPreset('schema');
        diffHasRunOnce = true;
      }
    } else if (viewName === 'code') {
      if (btnViewCode) btnViewCode.classList.add('active');
      if (sqlCodeViewer) {
        sqlCodeViewer.classList.remove('hidden');
        sqlCodeViewer.classList.add('active');
      }
      if (modeBadge) modeBadge.textContent = 'SQL Experiments 1-9';
      displayExperimentCode('ALL');
    }
  }

  if (btnViewTables) btnViewTables.addEventListener('click', () => switchView('tables'));
  if (btnViewPortal) btnViewPortal.addEventListener('click', () => switchView('portal'));
  if (btnViewDiff) btnViewDiff.addEventListener('click', () => switchView('diff'));
  if (btnViewCode) btnViewCode.addEventListener('click', () => switchView('code'));

  // Display SQL code by experiment key
  function displayExperimentCode(expKey) {
    const code = SQL_EXPERIMENTS[expKey] || SQL_EXPERIMENTS.ALL;
    sqlCodeDisplay.textContent = code;

    const titles = {
      ALL: 'Complete LIBRARY_DB Script (Experiments 1 - 9)',
      EXP1: 'Experiment 1: Database Creation & Table Schemas',
      EXP3: 'Experiment 3: DDL Commands with Constraints',
      EXP4: 'Experiment 4: DML & DCL Commands',
      EXP5: 'Experiment 5: Set Operators & String Functions',
      EXP6: 'Experiment 6: Aggregate Functions',
      EXP7: 'Experiment 7: Joins & Nested Subqueries',
      EXP8: 'Experiment 8: Clean Database Audit Trigger',
      EXP9: 'Experiment 9: Stored Procedures (CRUD & Reports)'
    };
    codeSectionTitle.textContent = titles[expKey] || 'SQL Experiment Script';
  }

  // Experiment Filter Pills
  if (expNavPills) {
    expNavPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.exp-pill');
      if (!pill) return;
      document.querySelectorAll('.exp-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      displayExperimentCode(pill.dataset.exp);
    });
  }

  // Copy Code Button
  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', () => {
      const code = sqlCodeDisplay.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtnText.textContent = 'Copied!';
        setTimeout(() => {
          copyBtnText.textContent = 'Copy SQL';
        }, 2000);
      });
    });
  }

  // Render SQL table view
  function renderTable(tableName) {
    currentActiveTable = tableName;
    const data = DB[tableName] || [];
    activeTableTitle.innerHTML = `Table: <strong>${tableName}</strong>`;
    activeTableCount.textContent = `${data.length} Rows`;

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td style="text-align:center; padding: 20px;">No records found in ${tableName}.</td></tr>`;
      return;
    }

    // Headers
    const keys = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    keys.forEach(k => {
      const th = document.createElement('th');
      th.textContent = k;
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    // Rows
    data.forEach(row => {
      const tr = document.createElement('tr');
      keys.forEach(k => {
        const td = document.createElement('td');
        let val = row[k];
        if (k === 'Price') val = `₹${parseFloat(val).toFixed(2)}`;
        td.textContent = val !== null && val !== undefined ? val : 'NULL';
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }

  // Table Tabs click handler
  tableTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tableTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tableName = btn.dataset.table;
      renderTable(tableName);
    });
  });

  // Calculate and update aggregate stats
  function updateAggregates() {
    const prices = DB.BOOKS.map(b => Number(b.Price) || 0);
    const sum = prices.reduce((a, b) => a + b, 0);
    const avg = prices.length ? sum / prices.length : 0;
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;

    const elAvg = document.getElementById('agg-avg');
    const elMin = document.getElementById('agg-min');
    const elMax = document.getElementById('agg-max');
    const elSum = document.getElementById('agg-sum');

    if (elAvg) elAvg.textContent = `₹${avg.toFixed(2)}`;
    if (elMin) elMin.textContent = `₹${min.toFixed(2)}`;
    if (elMax) elMax.textContent = `₹${max.toFixed(2)}`;
    if (elSum) elSum.textContent = `₹${sum.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }

  // ==============================================================================
  // EMPLOYEE MANAGEMENT PORTAL IMPLEMENTATION ("Manage Stuff")
  // ==============================================================================

  const portalStaffSelect = document.getElementById('portal-staff-select');
  const portalStaffAvatar = document.getElementById('portal-staff-avatar');
  if (portalStaffSelect) {
    portalStaffSelect.addEventListener('change', (e) => {
      currentActiveStaffId = parseInt(e.target.value, 10);
      showToast(`Switched active staff to ID ${currentActiveStaffId}`);
    });
  }

  // Portal Sub-Tab Switching
  const portalTabBtns = document.querySelectorAll('.portal-tab-btn');
  portalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      portalTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePortalTab = btn.dataset.portalTab;

      ['books', 'readers', 'circulation', 'reports'].forEach(tab => {
        const sub = document.getElementById(`portal-subview-${tab}`);
        if (sub) {
          if (tab === activePortalTab) sub.classList.remove('hidden');
          else sub.classList.add('hidden');
        }
      });
      renderPortalData();
    });
  });

  // Render all active Portal views
  function renderPortalData() {
    renderPortalBooks();
    renderPortalReaders();
    renderPortalCirculation();
    renderPortalReports();
    populateCirculationDropdowns();
    updateAllStats();
  }

  // 1. Portal Books View
  function renderPortalBooks() {
    const tbody = document.getElementById('portal-books-tbody');
    if (!tbody) return;

    const searchVal = (document.getElementById('portal-search-books')?.value || '').toLowerCase();
    const catVal = (document.getElementById('portal-filter-category')?.value || '').toLowerCase();

    const filtered = DB.BOOKS.filter(b => {
      const matchSearch = !searchVal || b.Title.toLowerCase().includes(searchVal) ||
                          b.Author.toLowerCase().includes(searchVal) ||
                          b.ISBN.toLowerCase().includes(searchVal);
      const matchCat = !catVal || b.Category.toLowerCase() === catVal;
      return matchSearch && matchCat;
    });

    tbody.innerHTML = '';
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color: var(--text-muted);">No books match the filter criteria.</td></tr>`;
      return;
    }

    filtered.forEach(book => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="font-family: var(--font-mono); color: var(--accent-primary);">${escapeHtml(book.ISBN)}</strong></td>
        <td><strong>${escapeHtml(book.Title)}</strong></td>
        <td>${escapeHtml(book.Author)}</td>
        <td><span class="badge">${escapeHtml(book.Category)}</span></td>
        <td>₹${parseFloat(book.Price).toFixed(2)}</td>
        <td>${escapeHtml(book.Edition || '1st')}</td>
        <td>${book.Staff_ID}</td>
        <td style="text-align: right;">
          <button class="portal-btn-sm" style="padding: 3px 8px; font-size: 0.72rem;" onclick="window.editBookPrice('${book.ISBN}')">
            <i class="fa-solid fa-pen-to-square"></i> Price
          </button>
          <button class="btn-table-del" onclick="window.deleteBook('${book.ISBN}')" title="Delete Book">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Global actions for Books
  window.editBookPrice = function(isbn) {
    const book = DB.BOOKS.find(b => b.ISBN === isbn);
    if (!book) return;
    const newPriceStr = prompt(`Enter new price for "${book.Title}" (Current: ₹${book.Price}):`, book.Price);
    if (newPriceStr !== null) {
      const newPrice = parseFloat(newPriceStr);
      if (!isNaN(newPrice) && newPrice > 0) {
        book.Price = newPrice;
        renderPortalData();
        renderTable('BOOKS');
        showToast(`Updated price for ${book.Title} to ₹${newPrice.toFixed(2)}`);
      } else {
        alert('Please enter a valid positive number for price.');
      }
    }
  };

  window.deleteBook = function(isbn) {
    const isLoaned = DB.RESERVE_RETURN.some(r => r.ISBN === isbn && (r.Return_Date === 'Pending' || !r.Return_Date));
    if (isLoaned) {
      alert(`Cannot delete book ${isbn}: Currently on active loan to a reader!`);
      return;
    }
    if (confirm(`Are you sure you want to delete book ${isbn} from the catalog?`)) {
      const idx = DB.BOOKS.findIndex(b => b.ISBN === isbn);
      if (idx !== -1) {
        const deleted = DB.BOOKS.splice(idx, 1)[0];
        renderPortalData();
        renderTable('BOOKS');
        showToast(`Deleted book "${deleted.Title}" from database`, 'warning');
      }
    }
  };

  // Add Book Form Handlers
  const btnToggleAddBookForm = document.getElementById('btn-toggle-add-book-form');
  const btnCloseBookForm = document.getElementById('btn-close-book-form');
  const btnCancelBookForm = document.getElementById('btn-cancel-book-form');
  const portalAddBookPanel = document.getElementById('portal-add-book-panel');
  const formAddBook = document.getElementById('form-add-book');

  function toggleAddBookPanel(show) {
    if (portalAddBookPanel) {
      if (show) portalAddBookPanel.classList.remove('hidden');
      else portalAddBookPanel.classList.add('hidden');
    }
  }

  if (btnToggleAddBookForm) btnToggleAddBookForm.addEventListener('click', () => toggleAddBookPanel(true));
  if (btnCloseBookForm) btnCloseBookForm.addEventListener('click', () => toggleAddBookPanel(false));
  if (btnCancelBookForm) btnCancelBookForm.addEventListener('click', () => toggleAddBookPanel(false));

  const btnModalAddBook = document.getElementById('btn-portal-modal-add-book');
  if (btnModalAddBook) {
    btnModalAddBook.addEventListener('click', () => {
      // Switch to books tab & open form
      portalTabBtns.forEach(b => b.classList.remove('active'));
      const booksTabBtn = document.querySelector('.portal-tab-btn[data-portal-tab="books"]');
      if (booksTabBtn) booksTabBtn.classList.add('active');
      activePortalTab = 'books';
      ['books', 'readers', 'circulation', 'reports'].forEach(t => {
        const sub = document.getElementById(`portal-subview-${t}`);
        if (sub) {
          if (t === 'books') sub.classList.remove('hidden');
          else sub.classList.add('hidden');
        }
      });
      toggleAddBookPanel(true);
      document.getElementById('book-isbn')?.focus();
    });
  }

  if (formAddBook) {
    formAddBook.addEventListener('submit', (e) => {
      e.preventDefault();
      const isbn = document.getElementById('book-isbn').value.trim().toUpperCase();
      const title = document.getElementById('book-title').value.trim();
      const author = document.getElementById('book-author').value.trim();
      const category = document.getElementById('book-category').value.trim();
      const price = parseFloat(document.getElementById('book-price').value);
      const edition = document.getElementById('book-edition').value.trim() || '1st';
      const pubId = parseInt(document.getElementById('book-pub-id').value, 10) || 201;

      if (DB.BOOKS.some(b => b.ISBN === isbn)) {
        alert(`A book with ISBN ${isbn} already exists in the database!`);
        return;
      }

      DB.BOOKS.push({
        ISBN: isbn,
        Title: title,
        Author: author,
        Category: category,
        Price: price,
        Publication_ID: pubId,
        Staff_ID: currentActiveStaffId,
        Edition: edition
      });

      formAddBook.reset();
      toggleAddBookPanel(false);
      renderPortalData();
      renderTable('BOOKS');
      showToast(`Book "${title}" (ISBN: ${isbn}) added to LIBRARY_DB!`);
    });
  }

  // Search & Filter listeners
  const portalSearchBooks = document.getElementById('portal-search-books');
  const portalFilterCategory = document.getElementById('portal-filter-category');
  if (portalSearchBooks) portalSearchBooks.addEventListener('input', renderPortalBooks);
  if (portalFilterCategory) portalFilterCategory.addEventListener('change', renderPortalBooks);

  // 2. Portal Readers View
  function renderPortalReaders() {
    const tbody = document.getElementById('portal-readers-tbody');
    if (!tbody) return;

    const searchVal = (document.getElementById('portal-search-readers')?.value || '').toLowerCase();
    const filtered = DB.READERS.filter(r => {
      const fullName = `${r.First_Name} ${r.Last_Name}`.toLowerCase();
      return !searchVal || fullName.includes(searchVal) ||
             r.Email.toLowerCase().includes(searchVal) ||
             r.Address.toLowerCase().includes(searchVal) ||
             String(r.User_ID).includes(searchVal);
    });

    tbody.innerHTML = '';
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color: var(--text-muted);">No readers found.</td></tr>`;
      return;
    }

    filtered.forEach(reader => {
      const activeLoansCount = DB.RESERVE_RETURN.filter(r => r.User_ID === reader.User_ID && (r.Return_Date === 'Pending' || !r.Return_Date)).length;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="font-family: var(--font-mono);">${reader.User_ID}</strong></td>
        <td><strong>${escapeHtml(reader.First_Name)} ${escapeHtml(reader.Last_Name)}</strong></td>
        <td>${escapeHtml(reader.Email)}</td>
        <td>${escapeHtml(reader.Phone_No)}</td>
        <td>${escapeHtml(reader.Address)}</td>
        <td>${reader.DOB || 'N/A'}</td>
        <td>
          ${activeLoansCount > 0 ? `<span class="status-badge-pending">${activeLoansCount} Borrowed</span>` : `<span class="status-badge-returned">Clear</span>`}
        </td>
        <td style="text-align: right;">
          <button class="btn-table-del" onclick="window.deleteReader(${reader.User_ID})" title="Remove Reader">
            <i class="fa-solid fa-user-minus"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.deleteReader = function(userId) {
    const hasLoans = DB.RESERVE_RETURN.some(r => r.User_ID === userId && (r.Return_Date === 'Pending' || !r.Return_Date));
    if (hasLoans) {
      alert(`Cannot delete reader User ID ${userId}: They currently hold unreturned books!`);
      return;
    }
    if (confirm(`Remove reader User ID ${userId} from registered members?`)) {
      const idx = DB.READERS.findIndex(r => r.User_ID === userId);
      if (idx !== -1) {
        const deleted = DB.READERS.splice(idx, 1)[0];
        renderPortalData();
        renderTable('READERS');
        showToast(`Reader ${deleted.First_Name} ${deleted.Last_Name} removed`, 'warning');
      }
    }
  };

  const btnToggleAddReader = document.getElementById('btn-toggle-add-reader-form');
  const btnCloseReaderForm = document.getElementById('btn-close-reader-form');
  const btnCancelReaderForm = document.getElementById('btn-cancel-reader-form');
  const portalAddReaderPanel = document.getElementById('portal-add-reader-panel');
  const formAddReader = document.getElementById('form-add-reader');

  function toggleAddReaderPanel(show) {
    if (portalAddReaderPanel) {
      if (show) {
        portalAddReaderPanel.classList.remove('hidden');
        // Suggest next User ID
        const nextId = Math.max(...DB.READERS.map(r => r.User_ID), 100) + 1;
        const idInput = document.getElementById('reader-user-id');
        if (idInput && !idInput.value) idInput.value = nextId;
      } else {
        portalAddReaderPanel.classList.add('hidden');
      }
    }
  }

  if (btnToggleAddReader) btnToggleAddReader.addEventListener('click', () => toggleAddReaderPanel(true));
  if (btnCloseReaderForm) btnCloseReaderForm.addEventListener('click', () => toggleAddReaderPanel(false));
  if (btnCancelReaderForm) btnCancelReaderForm.addEventListener('click', () => toggleAddReaderPanel(false));

  if (formAddReader) {
    formAddReader.addEventListener('submit', (e) => {
      e.preventDefault();
      const userId = parseInt(document.getElementById('reader-user-id').value, 10);
      const firstName = document.getElementById('reader-first-name').value.trim();
      const lastName = document.getElementById('reader-last-name').value.trim();
      const email = document.getElementById('reader-email').value.trim();
      const phone = document.getElementById('reader-phone').value.trim();
      const address = document.getElementById('reader-address').value.trim();
      const dob = document.getElementById('reader-dob').value;

      if (DB.READERS.some(r => r.User_ID === userId)) {
        alert(`User ID ${userId} is already assigned to an existing member!`);
        return;
      }

      DB.READERS.push({
        User_ID: userId,
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Phone_No: phone,
        Address: address,
        DOB: dob
      });

      formAddReader.reset();
      toggleAddReaderPanel(false);
      renderPortalData();
      renderTable('READERS');
      showToast(`Reader "${firstName} ${lastName}" registered successfully!`);
    });
  }

  const portalSearchReaders = document.getElementById('portal-search-readers');
  if (portalSearchReaders) portalSearchReaders.addEventListener('input', renderPortalReaders);

  // 3. Portal Circulation (Issue & Return) View
  let currentCircFilter = 'all';

  function populateCirculationDropdowns() {
    const readerSelect = document.getElementById('issue-reader-select');
    const bookSelect = document.getElementById('issue-book-select');
    const issueDateInput = document.getElementById('issue-reserve-date');
    const dueDateInput = document.getElementById('issue-due-date');

    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (issueDateInput && !issueDateInput.value) issueDateInput.value = today;
    if (dueDateInput && !dueDateInput.value) dueDateInput.value = dueDate;

    if (readerSelect) {
      readerSelect.innerHTML = DB.READERS.map(r => `<option value="${r.User_ID}">${r.User_ID} - ${r.First_Name} ${r.Last_Name} (${r.Address})</option>`).join('');
    }

    if (bookSelect) {
      bookSelect.innerHTML = DB.BOOKS.map(b => `<option value="${b.ISBN}">${b.ISBN} - "${b.Title}" by ${b.Author} (₹${b.Price})</option>`).join('');
    }
  }

  function renderPortalCirculation() {
    const tbody = document.getElementById('portal-circ-tbody');
    if (!tbody) return;

    let records = [...DB.RESERVE_RETURN];
    if (currentCircFilter === 'pending') {
      records = records.filter(r => r.Return_Date === 'Pending' || !r.Return_Date);
    } else if (currentCircFilter === 'returned') {
      records = records.filter(r => r.Return_Date && r.Return_Date !== 'Pending');
    }

    tbody.innerHTML = '';
    if (records.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-muted);">No circulation records in this category.</td></tr>`;
      return;
    }

    records.forEach(res => {
      const reader = DB.READERS.find(r => r.User_ID === res.User_ID) || { First_Name: 'Reader', Last_Name: `#${res.User_ID}` };
      const book = DB.BOOKS.find(b => b.ISBN === res.ISBN) || { Title: 'Unknown Book', Author: '' };
      const isPending = res.Return_Date === 'Pending' || !res.Return_Date;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="font-family: var(--font-mono);">#${res.Reserve_ID}</strong></td>
        <td><strong>${escapeHtml(reader.First_Name)} ${escapeHtml(reader.Last_Name)}</strong> <span style="font-size: 0.72rem; color: var(--text-muted);">(ID: ${res.User_ID})</span></td>
        <td><strong>${escapeHtml(book.Title)}</strong> <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-primary);">${res.ISBN}</span></td>
        <td>${res.Reserve_Date}</td>
        <td>${res.Due_Date}</td>
        <td>
          ${isPending ? `<span class="status-badge-pending"><i class="fa-solid fa-clock"></i> Pending Return</span>` : `<span class="status-badge-returned"><i class="fa-solid fa-check"></i> Returned ${res.Return_Date}</span>`}
        </td>
        <td style="text-align: right;">
          ${isPending ? `
            <button class="btn-desk-return" onclick="window.markBookReturned(${res.Reserve_ID})">
              <i class="fa-solid fa-rotate-left"></i> Mark Returned
            </button>
          ` : `
            <span style="font-size: 0.74rem; color: #16a34a; font-weight: 600;"><i class="fa-solid fa-circle-check"></i> Archived</span>
          `}
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Filter Buttons for Circulation
  const circFilterPills = document.getElementById('circFilterPills');
  if (circFilterPills) {
    circFilterPills.addEventListener('click', (e) => {
      const btn = e.target.closest('.circ-filter-btn');
      if (!btn) return;
      document.querySelectorAll('.circ-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCircFilter = btn.dataset.filter;
      renderPortalCirculation();
    });
  }

  // Issue Book Submission
  const formIssueBook = document.getElementById('form-issue-book');
  if (formIssueBook) {
    formIssueBook.addEventListener('submit', (e) => {
      e.preventDefault();
      const userId = parseInt(document.getElementById('issue-reader-select').value, 10);
      const isbn = document.getElementById('issue-book-select').value;
      const resDate = document.getElementById('issue-reserve-date').value;
      const dueDate = document.getElementById('issue-due-date').value;

      const nextReserveId = Math.max(...DB.RESERVE_RETURN.map(r => r.Reserve_ID), 0) + 1;
      const nextRegNo = Math.max(...DB.REPORTS.map(r => r.Reg_No), 0) + 1;

      // Add to RESERVE_RETURN
      DB.RESERVE_RETURN.push({
        Reserve_ID: nextReserveId,
        User_ID: userId,
        ISBN: isbn,
        Reserve_Date: resDate,
        Due_Date: dueDate,
        Return_Date: 'Pending'
      });

      // Add to REPORTS (Procedure dbo.ReserveBook audit ledger)
      DB.REPORTS.push({
        Reg_No: nextRegNo,
        Book_No: isbn,
        Issue_Return: 'Issue',
        User_ID: userId,
        Staff_ID: currentActiveStaffId
      });

      renderPortalData();
      renderTable('RESERVE_RETURN');
      showToast(`Book ${isbn} successfully issued to Reader #${userId}!`);
    });
  }

  // Quick Return Book Handler
  window.markBookReturned = function(reserveId) {
    const loan = DB.RESERVE_RETURN.find(r => r.Reserve_ID === reserveId);
    if (!loan) return;

    const today = new Date().toISOString().split('T')[0];
    loan.Return_Date = today;

    const nextRegNo = Math.max(...DB.REPORTS.map(r => r.Reg_No), 0) + 1;
    DB.REPORTS.push({
      Reg_No: nextRegNo,
      Book_No: loan.ISBN,
      Issue_Return: 'Return',
      User_ID: loan.User_ID,
      Staff_ID: currentActiveStaffId
    });

    renderPortalData();
    renderTable('RESERVE_RETURN');
    showToast(`Book ${loan.ISBN} marked as returned by Reader #${loan.User_ID}!`);
  };

  // Quick Issue Button in portal session bar
  const btnPortalModalIssue = document.getElementById('btn-portal-modal-issue');
  if (btnPortalModalIssue) {
    btnPortalModalIssue.addEventListener('click', () => {
      portalTabBtns.forEach(b => b.classList.remove('active'));
      const circTabBtn = document.querySelector('.portal-tab-btn[data-portal-tab="circulation"]');
      if (circTabBtn) circTabBtn.classList.add('active');
      activePortalTab = 'circulation';
      ['books', 'readers', 'circulation', 'reports'].forEach(t => {
        const sub = document.getElementById(`portal-subview-${t}`);
        if (sub) {
          if (t === 'circulation') sub.classList.remove('hidden');
          else sub.classList.add('hidden');
        }
      });
      document.getElementById('issue-reader-select')?.focus();
    });
  }

  // 4. Portal Reports & Audit Ledger View
  function renderPortalReports() {
    const tbody = document.getElementById('portal-reports-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const sortedReports = [...DB.REPORTS].reverse();

    sortedReports.forEach(rep => {
      const reader = DB.READERS.find(r => r.User_ID === rep.User_ID);
      const readerName = reader ? `${reader.First_Name} ${reader.Last_Name}` : `User ${rep.User_ID}`;
      const staff = DB.STAFF.find(s => s.Staff_ID === rep.Staff_ID);
      const staffName = staff ? staff.Name : `Staff #${rep.Staff_ID}`;

      const isIssue = rep.Issue_Return === 'Issue';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="font-family: var(--font-mono);">REG-${String(rep.Reg_No).padStart(3, '0')}</strong></td>
        <td><strong style="color: var(--accent-primary); font-family: var(--font-mono);">${rep.Book_No}</strong></td>
        <td>
          <span class="${isIssue ? 'status-badge-pending' : 'status-badge-returned'}">
            <i class="fa-solid ${isIssue ? 'fa-arrow-up-right-from-square' : 'fa-arrow-down-left-and-up-right-to-center'}"></i> ${rep.Issue_Return}
          </span>
        </td>
        <td>${escapeHtml(readerName)} <span style="font-size: 0.72rem; color: var(--text-muted);">(ID: ${rep.User_ID})</span></td>
        <td><i class="fa-solid fa-user-tie" style="color: var(--accent-primary); margin-right: 4px;"></i> ${escapeHtml(staffName)}</td>
        <td style="color: var(--text-muted); font-size: 0.78rem;">Verified Session Log</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Export DB as JSON
  const btnExportDbJson = document.getElementById('btn-portal-export-json');
  if (btnExportDbJson) {
    btnExportDbJson.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(DB, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute('href', dataStr);
      dlAnchor.setAttribute('download', 'LIBRARY_DB_live_snapshot.json');
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Exported full database snapshot to JSON file!');
    });
  }

  // Export Reports CSV
  const btnExportReportsCsv = document.getElementById('btn-export-reports-csv');
  if (btnExportReportsCsv) {
    btnExportReportsCsv.addEventListener('click', () => {
      let csv = 'Reg_No,Book_No,Issue_Return,User_ID,Staff_ID\n';
      DB.REPORTS.forEach(r => {
        csv += `${r.Reg_No},"${r.Book_No}","${r.Issue_Return}",${r.User_ID},${r.Staff_ID}\n`;
      });
      const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute('href', dataStr);
      dlAnchor.setAttribute('download', 'library_circulation_reports.csv');
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Exported reports ledger to CSV file!');
    });
  }

  // ==============================================================================
  // FILE COMPARISON TOOL IMPLEMENTATION ("Comparing Files")
  // ==============================================================================

  const diffPresetSelect = document.getElementById('diff-preset-select');
  const btnRunDiff = document.getElementById('btn-run-diff');
  const btnSwapDiff = document.getElementById('btn-swap-diff');
  const btnClearDiff = document.getElementById('btn-clear-diff');
  const btnDownloadPatch = document.getElementById('btn-download-patch');

  const btnModeSplit = document.getElementById('btn-mode-split');
  const btnModeUnified = document.getElementById('btn-mode-unified');
  const diffSplitContainer = document.getElementById('diffSplitContainer');
  const diffUnifiedContainer = document.getElementById('diffUnifiedContainer');
  const unifiedPatchCode = document.getElementById('unifiedPatchCode');

  const diffTextA = document.getElementById('diff-text-a');
  const diffTextB = document.getElementById('diff-text-b');
  const diffFileAName = document.getElementById('diff-file-a-name');
  const diffFileBName = document.getElementById('diff-file-b-name');
  const linesCountA = document.getElementById('lines-count-a');
  const linesCountB = document.getElementById('lines-count-b');
  const diffTableBody = document.getElementById('diffTableBody');

  const statDiffTotal = document.getElementById('stat-diff-total');
  const statDiffAdd = document.getElementById('stat-diff-add');
  const statDiffDel = document.getElementById('stat-diff-del');
  const statDiffMod = document.getElementById('stat-diff-mod');
  const statDiffSimilarity = document.getElementById('stat-diff-similarity');

  let currentDiffMode = 'split'; // 'split' | 'unified'

  // Presets Data
  const DIFF_PRESETS = {
    schema: {
      nameA: 'LIBRARY_DB_v1.0.sql',
      nameB: 'LIBRARY_DB_v2.0_Procedures.sql',
      textA: `-- LIBRARY_DB Schema v1.0 (Baseline Architecture)
CREATE DATABASE LIBRARY_DB;
GO
USE LIBRARY_DB;
GO

CREATE TABLE READERS (
    User_ID INT PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Email VARCHAR(100),
    Phone_No VARCHAR(15),
    Address VARCHAR(100),
    DOB DATE
);

CREATE TABLE BOOKS (
    ISBN VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(100),
    Author VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2),
    Publication_ID INT,
    Staff_ID INT
);

CREATE TABLE RESERVE_RETURN (
    Reserve_ID INT PRIMARY KEY,
    User_ID INT,
    ISBN VARCHAR(20),
    Reserve_Date DATE,
    Due_Date DATE,
    Return_Date DATE
);`,
      textB: `-- LIBRARY_DB Schema v2.0 (Enterprise Stored Procedures & Triggers)
CREATE DATABASE LIBRARY_DB;
GO
USE LIBRARY_DB;
GO

CREATE TABLE READERS (
    User_ID INT PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Phone_No VARCHAR(15),
    Address VARCHAR(100),
    DOB DATE
);

CREATE TABLE BOOKS (
    ISBN VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Category VARCHAR(50),
    Price DECIMAL(10,2) CHECK (Price > 0),
    Publication_ID INT,
    Staff_ID INT,
    Edition VARCHAR(20) DEFAULT '1st'
);

CREATE TABLE RESERVE_RETURN (
    Reserve_ID INT PRIMARY KEY,
    User_ID INT FOREIGN KEY REFERENCES READERS(User_ID),
    ISBN VARCHAR(20) FOREIGN KEY REFERENCES BOOKS(ISBN),
    Reserve_Date DATE DEFAULT GETDATE(),
    Due_Date DATE,
    Return_Date DATE
);

-- Consolidated Reader Audit Trigger
CREATE TRIGGER TRG_READERS_AUDIT ON READERS
AFTER INSERT, UPDATE, DELETE AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO READERS_AUDIT (User_ID, ActionType, LogDate)
    SELECT User_ID, 'MODIFIED', GETDATE() FROM inserted;
END;
GO`
    },

    catalog: {
      nameA: 'books_catalog_oct2026.csv',
      nameB: 'books_catalog_nov2026.csv',
      textA: `ISBN,Title,Author,Category,Price,Edition
B001,DBMS,virat,Computer,600.00,1st
B002,Java,rohit,Programming,450.00,2nd
B003,Python,mohan,Programming,550.00,1st`,
      textB: `ISBN,Title,Author,Category,Price,Edition
B001,DBMS Relational Models,virat,Computer,620.00,2nd
B002,Java Enterprise Core,rohit,Programming,450.00,2nd
B003,Python Data Science,mohan,Programming,580.00,2nd
B004,Clean Architecture,Robert Martin,Programming,750.00,1st
B005,Distributed Systems,Tanenbaum,Computer,890.00,3rd`
    },

    readers: {
      nameA: 'readers_directory_v1.txt',
      nameB: 'readers_directory_v2.txt',
      textA: `101: Ram Patil - ram@gmail.com - Mumbai (DOB: 2005-01-15)
102: Shyam Kumar - shyam@gmail.com - Pune (DOB: 2004-08-21)
103: Riya Shah - riya@gmail.com - Nashik (DOB: 2005-03-10)`,
      textB: `101: Ram Patil - ram.patil@university.edu - Mumbai (DOB: 2005-01-15) [Verified]
102: Shyam Kumar - shyam.k@techmail.com - Pune (DOB: 2004-08-21) [Verified]
103: Riya Shah - riya@gmail.com - Nashik (DOB: 2005-03-10) [Verified]
104: Ananya Kulkarni - ananya@gmail.com - Mumbai (DOB: 2004-05-12) [New Member]`
    }
  };

  function updateLineCounters() {
    if (diffTextA && linesCountA) {
      const lines = diffTextA.value ? diffTextA.value.split(/\r?\n/).length : 0;
      linesCountA.textContent = `${lines} line${lines === 1 ? '' : 's'}`;
    }
    if (diffTextB && linesCountB) {
      const lines = diffTextB.value ? diffTextB.value.split(/\r?\n/).length : 0;
      linesCountB.textContent = `${lines} line${lines === 1 ? '' : 's'}`;
    }
  }

  if (diffTextA) diffTextA.addEventListener('input', updateLineCounters);
  if (diffTextB) diffTextB.addEventListener('input', updateLineCounters);

  function loadDiffPreset(key) {
    const preset = DIFF_PRESETS[key];
    if (!preset) return;

    if (diffFileAName) diffFileAName.value = preset.nameA;
    if (diffFileBName) diffFileBName.value = preset.nameB;
    if (diffTextA) diffTextA.value = preset.textA;
    if (diffTextB) diffTextB.value = preset.textB;

    updateLineCounters();
    executeDiffComparison();
  }

  if (diffPresetSelect) {
    diffPresetSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val !== 'custom') {
        loadDiffPreset(val);
      }
    });
  }

  // File Upload Listeners
  function setupFileInput(inputElId, textEl, nameEl) {
    const input = document.getElementById(inputElId);
    if (!input) return;
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (nameEl) nameEl.value = file.name;
      const reader = new FileReader();
      reader.onload = (event) => {
        textEl.value = event.target.result;
        updateLineCounters();
        executeDiffComparison();
        showToast(`Uploaded ${file.name}`);
      };
      reader.readAsText(file);
    });
  }

  setupFileInput('upload-file-a', diffTextA, diffFileAName);
  setupFileInput('upload-file-b', diffTextB, diffFileBName);

  // Swap Files button
  if (btnSwapDiff) {
    btnSwapDiff.addEventListener('click', () => {
      const tempText = diffTextA.value;
      diffTextA.value = diffTextB.value;
      diffTextB.value = tempText;

      const tempName = diffFileAName.value;
      diffFileAName.value = diffFileBName.value;
      diffFileBName.value = tempName;

      updateLineCounters();
      executeDiffComparison();
      showToast('Swapped File A and File B');
    });
  }

  // Clear button
  if (btnClearDiff) {
    btnClearDiff.addEventListener('click', () => {
      diffTextA.value = '';
      diffTextB.value = '';
      updateLineCounters();
      diffTableBody.innerHTML = `<tr><td colspan="4" class="diff-placeholder">Inputs cleared. Paste text or choose a preset to compare.</td></tr>`;
      statDiffTotal.textContent = '0';
      statDiffAdd.textContent = '+0';
      statDiffDel.textContent = '-0';
      statDiffMod.textContent = '~0';
      statDiffSimilarity.textContent = '100%';
      showToast('Cleared diff inputs');
    });
  }

  // Run Comparison button
  if (btnRunDiff) {
    btnRunDiff.addEventListener('click', () => {
      executeDiffComparison();
    });
  }

  // Toggle View Mode: Split vs Unified
  if (btnModeSplit && btnModeUnified) {
    btnModeSplit.addEventListener('click', () => {
      btnModeSplit.classList.add('active');
      btnModeUnified.classList.remove('active');
      currentDiffMode = 'split';
      diffSplitContainer.classList.remove('hidden');
      diffUnifiedContainer.classList.add('hidden');
    });

    btnModeUnified.addEventListener('click', () => {
      btnModeUnified.classList.add('active');
      btnModeSplit.classList.remove('active');
      currentDiffMode = 'unified';
      diffSplitContainer.classList.add('hidden');
      diffUnifiedContainer.classList.remove('hidden');
    });
  }

  // Diff Algorithm: Longest Common Subsequence & Line-by-Line Delta Engine
  function executeDiffComparison() {
    const rawA = diffTextA.value;
    const rawB = diffTextB.value;

    const linesA = rawA ? rawA.split(/\r?\n/) : [];
    const linesB = rawB ? rawB.split(/\r?\n/) : [];

    updateLineCounters();

    // Compute LCS matrix
    const M = linesA.length;
    const N = linesB.length;
    const dp = Array.from({ length: M + 1 }, () => new Int32Array(N + 1));

    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        if (linesA[i] === linesB[j]) {
          dp[i + 1][j + 1] = dp[i][j] + 1;
        } else {
          dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
      }
    }

    // Backtrack to build diff ops
    const diffOps = [];
    let i = M;
    let j = N;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
        diffOps.push({ type: 'equal', lineA: linesA[i - 1], lineB: linesB[j - 1], numA: i, numB: j });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        diffOps.push({ type: 'add', lineB: linesB[j - 1], numB: j });
        j--;
      } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
        diffOps.push({ type: 'del', lineA: linesA[i - 1], numA: i });
        i--;
      }
    }

    diffOps.reverse();

    // Cluster consecutive del + add pairs into modifications for cleaner side-by-side view
    const splitRows = [];
    let k = 0;
    let countAdds = 0;
    let countDels = 0;
    let countMods = 0;
    let countEqual = 0;

    while (k < diffOps.length) {
      const op = diffOps[k];
      if (op.type === 'equal') {
        splitRows.push({
          type: 'equal',
          numA: op.numA,
          textA: op.lineA,
          numB: op.numB,
          textB: op.lineB
        });
        countEqual++;
        k++;
      } else if (op.type === 'del') {
        // Check if immediately followed by add
        if (k + 1 < diffOps.length && diffOps[k + 1].type === 'add') {
          const nextOp = diffOps[k + 1];
          splitRows.push({
            type: 'mod',
            numA: op.numA,
            textA: op.lineA,
            numB: nextOp.numB,
            textB: nextOp.lineB
          });
          countMods++;
          k += 2;
        } else {
          splitRows.push({
            type: 'del',
            numA: op.numA,
            textA: op.lineA,
            numB: '',
            textB: ''
          });
          countDels++;
          k++;
        }
      } else if (op.type === 'add') {
        splitRows.push({
          type: 'add',
          numA: '',
          textA: '',
          numB: op.numB,
          textB: op.lineB
        });
        countAdds++;
        k++;
      }
    }

    // Render Split Diff Table
    diffTableBody.innerHTML = '';
    splitRows.forEach(row => {
      const tr = document.createElement('tr');
      let rowClass = '';
      if (row.type === 'add') rowClass = 'diff-row-added';
      else if (row.type === 'del') rowClass = 'diff-row-deleted';
      else if (row.type === 'mod') rowClass = 'diff-row-modified';

      tr.className = rowClass;

      let cellA = escapeHtml(row.textA);
      let cellB = escapeHtml(row.textB);

      if (row.type === 'mod') {
        cellA = `<span class="diff-token-del">${cellA}</span>`;
        cellB = `<span class="diff-token-add">${cellB}</span>`;
      }

      tr.innerHTML = `
        <td class="diff-num-col">${row.numA || ''}</td>
        <td class="diff-code-col">${cellA || (row.type === 'add' ? '<span style="color:#cbd5e1;">(empty)</span>' : '')}</td>
        <td class="diff-num-col">${row.numB || ''}</td>
        <td class="diff-code-col">${cellB || (row.type === 'del' ? '<span style="color:#cbd5e1;">(empty)</span>' : '')}</td>
      `;
      diffTableBody.appendChild(tr);
    });

    // Update Statistics
    const totalLines = Math.max(M, N);
    const totalChanges = countAdds + countDels + countMods;
    const similarity = totalLines > 0 ? Math.max(0, Math.round(((totalLines - totalChanges) / totalLines) * 100)) : 100;

    statDiffTotal.textContent = totalLines;
    statDiffAdd.textContent = `+${countAdds}`;
    statDiffDel.textContent = `-${countDels}`;
    statDiffMod.textContent = `~${countMods}`;
    statDiffSimilarity.textContent = `${similarity}%`;

    // Render Unified Patch View
    const fileNameA = diffFileAName.value || 'FileA';
    const fileNameB = diffFileBName.value || 'FileB';
    let patchOutput = `<span class="patch-header">--- a/${escapeHtml(fileNameA)}</span>\n<span class="patch-header">+++ b/${escapeHtml(fileNameB)}</span>\n<span class="patch-chunk">@@ -1,${M} +1,${N} @@</span>\n`;

    splitRows.forEach(row => {
      if (row.type === 'equal') {
        patchOutput += `  ${escapeHtml(row.textA)}\n`;
      } else if (row.type === 'del') {
        patchOutput += `<span class="patch-del">- ${escapeHtml(row.textA)}</span>\n`;
      } else if (row.type === 'add') {
        patchOutput += `<span class="patch-add">+ ${escapeHtml(row.textB)}</span>\n`;
      } else if (row.type === 'mod') {
        patchOutput += `<span class="patch-del">- ${escapeHtml(row.textA)}</span>\n<span class="patch-add">+ ${escapeHtml(row.textB)}</span>\n`;
      }
    });

    unifiedPatchCode.innerHTML = patchOutput;
    showToast(`Diff computed: +${countAdds} additions, -${countDels} deletions, ~${countMods} modifications (${similarity}% match)`);
  }

  // Download Unified Patch File
  if (btnDownloadPatch) {
    btnDownloadPatch.addEventListener('click', () => {
      const fileNameA = diffFileAName.value || 'FileA';
      const fileNameB = diffFileBName.value || 'FileB';
      const cleanPatch = unifiedPatchCode.innerText || unifiedPatchCode.textContent;
      const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(cleanPatch);
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute('href', dataStr);
      dlAnchor.setAttribute('download', `${fileNameA}_to_${fileNameB}.patch`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Exported unified .patch file!');
    });
  }

  // Initial table load
  renderTable('BOOKS');
  updateAllStats();
  displayExperimentCode('ALL');

  // Chat message submission
  function handleSendMessage() {
    const query = userInput.value.trim();
    if (!query) return;

    appendUserMessage(query);
    userInput.value = '';

    setTimeout(() => {
      const response = processQuery(query);
      appendBotMessage(response);
    }, 200);
  }

  function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user-message';
    msgDiv.innerHTML = `<div class="msg-body">${escapeHtml(text)}</div>`;
    messagesArea.appendChild(msgDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  function appendBotMessage(html) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot-message';
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-body">${html}</div>
    `;
    messagesArea.appendChild(msgDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  sendBtn.addEventListener('click', handleSendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  // Query chips click
  queryChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const query = chip.dataset.query;
    userInput.value = query;
    handleSendMessage();
  });

  // Clear chat history
  btnClearChat.addEventListener('click', () => {
    messagesArea.innerHTML = `
      <div class="message bot-message">
        <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-body">
          <p>Chat cleared. Ask anything regarding <strong>LIBRARY_DB</strong>, the Employee Portal, File Compare, or the 9 SQL experiments!</p>
        </div>
      </div>
    `;
  });

  // Natural Language & SQL Query Processing Engine
  function processQuery(input) {
    const q = input.toLowerCase();

    // Portal / Manage questions
    if (q.includes('portal') || q.includes('employee') || q.includes('manage stuff') || q.includes('manage library')) {
      return `
        <div class="sql-badge"><i class="fa-solid fa-user-shield"></i> EMPLOYEE MANAGEMENT PORTAL</div>
        <p>The <strong>Employee Portal</strong> enables library staff to manage the database live:</p>
        <ul style="margin: 6px 0 6px 18px; font-size: 0.82rem; line-height: 1.6;">
          <li><strong>Books Catalog:</strong> Add new books, update pricing, remove titles.</li>
          <li><strong>Readers:</strong> Register new members and check borrower status.</li>
          <li><strong>Issue &amp; Return Desk:</strong> Transactionally issue books with due dates and execute 1-click returns.</li>
          <li><strong>Audit Ledger:</strong> Review real-time <code>REPORTS</code> table entries and download CSV ledgers.</li>
        </ul>
        <button class="portal-action-btn primary" style="margin-top: 6px; padding: 5px 12px; font-size: 0.78rem;" onclick="document.getElementById('btn-view-portal').click()">
          <i class="fa-solid fa-arrow-right"></i> Open Employee Portal Now
        </button>
      `;
    }

    // Compare / Diff questions
    if (q.includes('compare') || q.includes('diff') || q.includes('file diff') || q.includes('comparing files')) {
      return `
        <div class="sql-badge"><i class="fa-solid fa-code-compare"></i> FILE &amp; SQL COMPARISON ENGINE</div>
        <p>You can compare schemas, inventories, and CSV/JSON files side-by-side or as unified git patches:</p>
        <ul style="margin: 6px 0 6px 18px; font-size: 0.82rem; line-height: 1.6;">
          <li><strong>Side-by-Side:</strong> Visual line-by-line diff with synchronized line numbers and color highlights.</li>
          <li><strong>Unified Patch:</strong> Standard git patch with line counts and additions/deletions.</li>
          <li><strong>Upload &amp; Export:</strong> Upload your own <code>.sql</code>, <code>.csv</code>, or <code>.txt</code> files or export <code>.patch</code>.</li>
        </ul>
        <button class="portal-action-btn primary" style="margin-top: 6px; padding: 5px 12px; font-size: 0.78rem;" onclick="document.getElementById('btn-view-diff').click()">
          <i class="fa-solid fa-arrow-right"></i> Launch Compare Files Tool
        </button>
      `;
    }

    // Active Loans / Reservations
    if (q.includes('active loan') || q.includes('reservation') || q.includes('pending') || q.includes('borrow')) {
      const pendingLoans = DB.RESERVE_RETURN.filter(r => r.Return_Date === 'Pending' || !r.Return_Date);
      if (pendingLoans.length === 0) {
        return `<p>There are currently no active pending loans. All borrowed books have been returned.</p>`;
      }
      const rows = pendingLoans.map(r => {
        const book = DB.BOOKS.find(b => b.ISBN === r.ISBN) || { Title: r.ISBN };
        const reader = DB.READERS.find(u => u.User_ID === r.User_ID) || { First_Name: `User`, Last_Name: `#${r.User_ID}` };
        return `<tr>
          <td>#${r.Reserve_ID}</td>
          <td>${reader.First_Name} ${reader.Last_Name}</td>
          <td>${book.Title} (${r.ISBN})</td>
          <td>${r.Due_Date}</td>
          <td><span class="status-badge-pending">Pending</span></td>
        </tr>`;
      }).join('');

      return `
        <div class="sql-badge">SELECT * FROM RESERVE_RETURN WHERE Return_Date IS NULL OR Return_Date = 'Pending'</div>
        <p>Found <strong>${pendingLoans.length} active loan(s)</strong> currently with readers:</p>
        <table class="sql-result-table">
          <tr><th>Reserve ID</th><th>Reader</th><th>Book</th><th>Due Date</th><th>Status</th></tr>
          ${rows}
        </table>
      `;
    }

    // Stored Procedures Questions
    if (q.includes('procedure') || q.includes('sp_') || q.includes('stored procedure')) {
      return `
        <div class="sql-badge">EXPERIMENT 9: STORED PROCEDURES</div>
        <p><strong>LIBRARY_DB</strong> provides 8 production-grade stored procedures:</p>
        <ul style="margin: 6px 0 6px 18px; font-size: 0.82rem; line-height: 1.6;">
          <li><code>dbo.GetBookDetails</code>: Returns books with publisher information.</li>
          <li><code>dbo.RegisterReader</code>: Validates inputs and registers new readers.</li>
          <li><code>dbo.AddBook</code>: Inserts book catalog entries with foreign key checks.</li>
          <li><code>dbo.ReserveBook</code>: Issues books transactionally and logs to REPORTS.</li>
          <li><code>dbo.ReturnBook</code>: Updates return timestamp and logs return event.</li>
          <li><code>dbo.GetReaderHistory</code>: Fetches all loan history for a user.</li>
          <li><code>dbo.GetLibraryReport</code>: Comprehensive audit and circulation ledger.</li>
          <li><code>dbo.AuthenticateStaff</code>: Validates credentials against AUTHENTICATION_SYSTEM.</li>
        </ul>
        <p class="msg-hint">Switch to the "SQL Lab Code" tab to view or copy the procedure definitions!</p>
      `;
    }

    // Trigger Questions
    if (q.includes('trigger') || q.includes('audit')) {
      return `
        <div class="sql-badge">EXPERIMENT 8: DATABASE TRIGGER</div>
        <p>A consolidated trigger <code>TRG_READERS_AUDIT</code> on table <code>READERS</code> captures <strong>INSERT</strong>, <strong>UPDATE</strong>, and <strong>DELETE</strong> events into <code>READERS_AUDIT</code> with timestamps.</p>
        <p>Redundant split triggers have been merged into this single efficient routine.</p>
      `;
    }

    // 1. SELECT * FROM STAFF or Staff questions
    if (q.includes('staff') || q.includes('select * from staff')) {
      const rows = DB.STAFF.map(s => `<tr><td>${s.Staff_ID}</td><td>${s.Name}</td></tr>`).join('');
      return `
        <div class="sql-badge">SELECT * FROM STAFF</div>
        <p>Found <strong>${DB.STAFF.length}</strong> staff members:</p>
        <table class="sql-result-table">
          <tr><th>Staff_ID</th><th>Name</th></tr>
          ${rows}
        </table>
      `;
    }

    // 2. Average / Aggregate price questions
    if (q.includes('average') || q.includes('avg') || q.includes('min') || q.includes('max') || q.includes('total price')) {
      const prices = DB.BOOKS.map(b => Number(b.Price) || 0);
      const sum = prices.reduce((a, b) => a + b, 0);
      const avg = prices.length ? sum / prices.length : 0;
      return `
        <div class="sql-badge">SELECT AVG(Price), MIN(Price), MAX(Price), SUM(Price) FROM BOOKS</div>
        <p>Aggregate metrics for <strong>${DB.BOOKS.length} books</strong> in current catalog:</p>
        <table class="sql-result-table">
          <tr><th>Average Price</th><th>Min Price</th><th>Max Price</th><th>Total Value</th></tr>
          <tr><td>₹${avg.toFixed(2)}</td><td>₹${Math.min(...prices).toFixed(2)}</td><td>₹${Math.max(...prices).toFixed(2)}</td><td>₹${sum.toFixed(2)}</td></tr>
        </table>
      `;
    }

    // 3. Specific Book inquiries (e.g. B001, B002, B003)
    if (q.includes('b001') || q.includes('dbms')) {
      const book = DB.BOOKS.find(b => b.ISBN === 'B001');
      const res = DB.RESERVE_RETURN.find(r => r.ISBN === 'B001');
      const reader = res ? DB.READERS.find(r => r.User_ID === res.User_ID) : null;
      return `
        <div class="sql-badge">SELECT * FROM BOOKS b JOIN RESERVE_RETURN r ON b.ISBN = r.ISBN WHERE b.ISBN = 'B001'</div>
        <p>Book <strong>B001 (${book ? book.Title : 'DBMS'})</strong> by ${book ? book.Author : 'virat'} (Price: ₹${book ? book.Price : 600}):</p>
        ${reader ? `<p>Currently reserved by <strong>${reader.First_Name} ${reader.Last_Name}</strong> (User ID: ${reader.User_ID}, ${reader.Address}) from <code>${res.Reserve_Date}</code> to <code>${res.Due_Date}</code>.</p>` : `<p>Available in inventory.</p>`}
      `;
    }

    // 4. Programming / Computer category filter
    if (q.includes('programming') || q.includes('computer')) {
      const cat = q.includes('programming') ? 'Programming' : 'Computer';
      const filtered = DB.BOOKS.filter(b => b.Category.toLowerCase() === cat.toLowerCase());
      const rows = filtered.map(b => `<tr><td>${b.ISBN}</td><td>${b.Title}</td><td>${b.Author}</td><td>₹${Number(b.Price).toFixed(2)}</td><td>${b.Edition || '1st'}</td></tr>`).join('');
      return `
        <div class="sql-badge">SELECT * FROM BOOKS WHERE Category = '${cat}'</div>
        <p>Found <strong>${filtered.length}</strong> title(s) in category <strong>${cat}</strong>:</p>
        <table class="sql-result-table">
          <tr><th>ISBN</th><th>Title</th><th>Author</th><th>Price</th><th>Edition</th></tr>
          ${rows}
        </table>
      `;
    }

    // 5. Books listing / SELECT * FROM BOOKS
    if (q.includes('book') || q.includes('books')) {
      const rows = DB.BOOKS.map(b => `<tr><td>${b.ISBN}</td><td>${b.Title}</td><td>${b.Author}</td><td>${b.Category}</td><td>₹${Number(b.Price).toFixed(2)}</td></tr>`).join('');
      return `
        <div class="sql-badge">SELECT * FROM BOOKS</div>
        <p>Catalog contains <strong>${DB.BOOKS.length}</strong> books:</p>
        <table class="sql-result-table">
          <tr><th>ISBN</th><th>Title</th><th>Author</th><th>Category</th><th>Price</th></tr>
          ${rows}
        </table>
      `;
    }

    // 6. Registered Readers / Users
    if (q.includes('reader') || q.includes('user') || q.includes('member')) {
      const rows = DB.READERS.map(r => `<tr><td>${r.User_ID}</td><td>${r.First_Name} ${r.Last_Name}</td><td>${r.Email}</td><td>${r.Address}</td><td>${r.DOB}</td></tr>`).join('');
      return `
        <div class="sql-badge">SELECT * FROM READERS</div>
        <p>Found <strong>${DB.READERS.length}</strong> registered readers:</p>
        <table class="sql-result-table">
          <tr><th>User_ID</th><th>Full Name</th><th>Email</th><th>City</th><th>DOB</th></tr>
          ${rows}
        </table>
      `;
    }

    // 7. Default fallback response
    return `
      <p>I understood your query about <code>LIBRARY_DB</code>. You can query table data, use the employee portal, or compare files:</p>
      <ul style="margin: 8px 0 8px 18px; font-size: 0.85rem; color: var(--text-secondary);">
        <li><em>"List all books"</em></li>
        <li><em>"Show registered readers"</em></li>
        <li><em>"Show active book reservations"</em></li>
        <li><em>"How to manage library records in employee portal?"</em></li>
        <li><em>"Compare SQL schema versions"</em></li>
      </ul>
    `;
  }
});
