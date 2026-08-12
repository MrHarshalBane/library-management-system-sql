# Library Management System

A SQL Server database project for managing readers, staff, books, publishers, authentication, issue/return reports, and reservations.

## Technologies
- SQL Server / T-SQL
- Relational Database Management System (RDBMS)
- Primary Keys & Foreign Keys
- CRUD operations
- Aggregate functions

## Database Structure
- `READERS` – stores reader information
- `STAFF` – stores library staff information
- `AUTHENTICATION_SYSTEM` – staff login records
- `PUBLISHING` – publisher information
- `BOOKS` – book details and pricing
- `REPORTS` – issue/return records
- `RESERVE_RETURN` – reservation, due-date, and return information

## Operations Demonstrated
- Database and table creation
- Foreign-key relationships
- ALTER TABLE
- INSERT
- SELECT
- UPDATE
- DELETE
- `MIN()`, `MAX()`, `COUNT()`, `SUM()`, `AVG()`
- Sample library data

## How to Run
1. Open SQL Server Management Studio (SSMS).
2. Open `sql/library_management.sql`.
3. Execute the script.
4. The `LIBRARY_DB` database and all tables will be created.
5. Review the sample queries and aggregate results.

## GitHub Repository
Suggested repository name:

`library-management-system-sql`

## Notes
This is an academic/demo database project. The sample authentication passwords are intentionally simple demonstration values and should not be used in a production application.
