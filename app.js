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
  const btnViewCode = document.getElementById('btn-view-code');
  const tableViewContainer = document.getElementById('tableViewContainer');
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

  if (statBooks) statBooks.textContent = DB.BOOKS.length;
  if (statReaders) statReaders.textContent = DB.READERS.length;
  if (statStaff) statStaff.textContent = DB.STAFF.length;
  if (statReserve) statReserve.textContent = DB.RESERVE_RETURN.length;

  // View Switcher Handlers
  if (btnViewTables && btnViewCode) {
    btnViewTables.addEventListener('click', () => {
      btnViewTables.classList.add('active');
      btnViewCode.classList.remove('active');
      tableViewContainer.classList.remove('hidden');
      sqlCodeViewer.classList.remove('active');
      modeBadge.textContent = 'Database Tables';
    });

    btnViewCode.addEventListener('click', () => {
      btnViewCode.classList.add('active');
      btnViewTables.classList.remove('active');
      tableViewContainer.classList.add('hidden');
      sqlCodeViewer.classList.add('active');
      modeBadge.textContent = 'SQL Experiments 1-9';
      displayExperimentCode('ALL');
    });
  }

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
    const data = DB[tableName] || [];
    activeTableTitle.innerHTML = `Table: <strong>${tableName}</strong>`;
    activeTableCount.textContent = `${data.length} Rows`;

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td style="text-align:center; padding: 20px;">No records found.</td></tr>`;
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
        td.textContent = val;
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
    const prices = DB.BOOKS.map(b => b.Price);
    const sum = prices.reduce((a, b) => a + b, 0);
    const avg = sum / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const elAvg = document.getElementById('agg-avg');
    const elMin = document.getElementById('agg-min');
    const elMax = document.getElementById('agg-max');
    const elSum = document.getElementById('agg-sum');

    if (elAvg) elAvg.textContent = `₹${avg.toFixed(2)}`;
    if (elMin) elMin.textContent = `₹${min.toFixed(2)}`;
    if (elMax) elMax.textContent = `₹${max.toFixed(2)}`;
    if (elSum) elSum.textContent = `₹${sum.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }

  // Initial table load
  renderTable('BOOKS');
  updateAggregates();
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
    const div = document.createElement('div');
    div.textContent = str;
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
          <p>Chat cleared. Ask anything regarding <strong>LIBRARY_DB</strong> or the 9 SQL experiments!</p>
        </div>
      </div>
    `;
  });

  // Natural Language & SQL Query Processing Engine
  function processQuery(input) {
    const q = input.toLowerCase();

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
        <p class="msg-hint">Switch to the "Complete SQL Lab Code" tab to view or copy the procedure definitions!</p>
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
      const prices = DB.BOOKS.map(b => b.Price);
      const sum = prices.reduce((a, b) => a + b, 0);
      const avg = sum / prices.length;
      return `
        <div class="sql-badge">SELECT AVG(Price), MIN(Price), MAX(Price), SUM(Price) FROM BOOKS</div>
        <p>Aggregate metrics for <strong>${DB.BOOKS.length} books</strong>:</p>
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
      const reader = DB.READERS.find(r => r.User_ID === res.User_ID);
      return `
        <div class="sql-badge">SELECT * FROM BOOKS b JOIN RESERVE_RETURN r ON b.ISBN = r.ISBN WHERE b.ISBN = 'B001'</div>
        <p>Book <strong>B001 (${book.Title})</strong> by ${book.Author} (Price: ₹${book.Price}):</p>
        <p>Currently reserved by <strong>${reader.First_Name} ${reader.Last_Name}</strong> (User ID: ${reader.User_ID}, ${reader.Address}) from <code>${res.Reserve_Date}</code> to <code>${res.Due_Date}</code>.</p>
      `;
    }

    // 4. Programming / Computer category filter
    if (q.includes('programming') || q.includes('computer')) {
      const cat = q.includes('programming') ? 'Programming' : 'Computer';
      const filtered = DB.BOOKS.filter(b => b.Category.toLowerCase() === cat.toLowerCase());
      const rows = filtered.map(b => `<tr><td>${b.ISBN}</td><td>${b.Title}</td><td>${b.Author}</td><td>₹${b.Price}</td><td>${b.Edition}</td></tr>`).join('');
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
      const rows = DB.BOOKS.map(b => `<tr><td>${b.ISBN}</td><td>${b.Title}</td><td>${b.Author}</td><td>${b.Category}</td><td>₹${b.Price}</td></tr>`).join('');
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

    // 7. Reservations / Loans
    if (q.includes('reserv') || q.includes('return') || q.includes('due')) {
      const rows = DB.RESERVE_RETURN.map(r => `<tr><td>${r.Reserve_ID}</td><td>${r.User_ID}</td><td>${r.ISBN}</td><td>${r.Reserve_Date}</td><td>${r.Due_Date}</td><td>${r.Return_Date}</td></tr>`).join('');
      return `
        <div class="sql-badge">SELECT * FROM RESERVE_RETURN</div>
        <p>Active loan and reservation registry:</p>
        <table class="sql-result-table">
          <tr><th>Reserve_ID</th><th>User_ID</th><th>ISBN</th><th>Reserve_Date</th><th>Due_Date</th><th>Return_Date</th></tr>
          ${rows}
        </table>
      `;
    }

    // 8. Default fallback response
    return `
      <p>I understood your query about <code>LIBRARY_DB</code>. You can query table data or ask about experiments:</p>
      <ul style="margin: 8px 0 8px 18px; font-size: 0.85rem; color: var(--text-secondary);">
        <li><em>"List all books"</em></li>
        <li><em>"Show registered readers"</em></li>
        <li><em>"What is the average price of books?"</em></li>
        <li><em>"Explain the stored procedures in experiment 9"</em></li>
        <li><em>"How does the readers audit trigger work?"</em></li>
      </ul>
    `;
  }
});
