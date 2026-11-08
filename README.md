# Library Management System (LIBRARY_DB)

An interactive relational database management system, complete SQL Server / T-SQL laboratory suite (Experiments 1–9), Employee Management Portal, and File Comparison Diff Tool.

🔗 **Live Web Demo:** [https://mrharshalbane.github.io/library-management-system-sql/](https://mrharshalbane.github.io/library-management-system-sql/)

---

## 🌟 Key Features

### 1. 🏢 Employee Management Portal ("Manage Stuff")
Designed for librarians and staff members to manage daily circulation and database records in real-time:
- **Staff Session Control:** Switch between active staff members (Amit Sharma, Neha Verma, or Admin Supervisor).
- **Books Catalog Management:** Register new books (ISBN, Title, Author, Category, Price, Edition, Publisher), edit pricing, and safely delete titles with active-loan safeguards.
- **Readers / Member Registration:** Register new library members with User ID, contact details, address, and view active borrowing statuses.
- **Issue & Return Desk (Circulation):** Transactional book issuance with auto-calculated due dates, and 1-click **Return Book** action that updates return dates and logs audit records.
- **Audit & Reports Ledger:** Live log of all `REPORTS` table transactions (Issue & Return actions, User ID, Staff in charge) with CSV download support.
- **Export Database Snapshot:** 1-click JSON snapshot export of the entire database.

### 2. 🔍 File & SQL Comparison Tool ("Comparing Files")
A built-in side-by-side and unified diff comparison engine:
- **Side-by-Side Split View:** Synchronized line numbers with green additions (`+`), red deletions (`-`), and amber modifications (`~`).
- **Unified Patch View:** Standard Git diff formatting with chunk headers (`@@ -line,count +line,count @@`).
- **Diff Statistics Bar:** Real-time line counters, addition counts, deletion counts, modification counts, and similarity match percentage.
- **Pre-Loaded Presets:**
  - *Schema v1.0 vs v2.0* (Stored Procedures & Triggers upgrade)
  - *Book Inventory* (October vs November Catalog CSV)
  - *Reader Directory* (Prior vs Updated Member contacts)
- **Custom Upload & Export:** Upload any `.sql`, `.csv`, `.txt`, `.json`, or `.md` file, swap files, or export unified `.patch` files.

### 3. 📊 Live Relational Database Explorer
- Interactive table grid browser for `BOOKS`, `READERS`, `RESERVE_RETURN`, `STAFF`, `PUBLISHING`, and `REPORTS`.
- Dynamic SQL aggregate metrics (`AVG(Price)`, `MIN(Price)`, `MAX(Price)`, `SUM(Price)`).

### 4. 🤖 Natural Language & SQL Query Assistant
- Query the database in natural English (e.g., *"List all books"*, *"Who reserved book B001?"*, *"Show active book reservations"*) or SQL syntax.
- Instant query suggestion chips.

### 5. 📜 Complete SQL Lab Experiments (1 to 9)
Full T-SQL scripts ready for SQL Server Management Studio (SSMS):
- **Exp 1:** ER Modeling & Database Schema Creation
- **Exp 3:** DDL Commands, Primary & Foreign Keys, Constraints
- **Exp 4:** DML (INSERT, UPDATE, DELETE) & DCL (GRANT, REVOKE)
- **Exp 5:** Set Operators (`UNION`, `INTERSECT`, `EXCEPT`) & String Functions
- **Exp 6:** Aggregate Functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) & `GROUP BY` / `HAVING`
- **Exp 7:** Joins (INNER, LEFT, RIGHT, FULL) & Nested Subqueries
- **Exp 8:** Consolidated Audit Trigger (`TRG_READERS_AUDIT`)
- **Exp 9:** Production-Grade Stored Procedures (`dbo.ReserveBook`, `dbo.ReturnBook`, `dbo.GetBookDetails`, etc.)

---

## 🛠️ Tech Stack
- **Database Engine:** T-SQL / Microsoft SQL Server
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3, JetBrains Mono & Plus Jakarta Sans typography
- **Diff Engine:** Longest Common Subsequence (LCS) algorithm
- **Icons:** Font Awesome 6.5
- **Hosting:** GitHub Pages

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/MrHarshalBane/library-management-system-sql.git
   cd library-management-system-sql
   ```

2. Open `index.html` in any modern web browser or serve via any static HTTP server:
   ```bash
   npx serve .
   ```

3. To execute the SQL scripts in SQL Server:
   - Open SSMS.
   - Open `library_management.sql`.
   - Execute to create `LIBRARY_DB` with all tables, constraints, triggers, and stored procedures.

---

## 👤 Author
Developed by **[Harshal Bane](https://github.com/MrHarshalBane)**.
