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

  // DOM Elements
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

  // Chat message submission
  function handleSendMessage() {
    const query = userInput.value.trim();
    if (!query) return;

    appendUserMessage(query);
    userInput.value = '';

    setTimeout(() => {
      const response = processQuery(query);
      appendBotMessage(response);
    }, 250);
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
          <p>Chat cleared. Ask anything regarding <strong>LIBRARY_DB</strong>!</p>
        </div>
      </div>
    `;
  });

  // Natural Language & SQL Query Processing Engine
  function processQuery(input) {
    const q = input.toLowerCase();

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
      <p>I understood your query about <code>LIBRARY_DB</code>. You can query table data directly, for example:</p>
      <ul style="margin: 8px 0 8px 18px; font-size: 0.85rem; color: var(--text-secondary);">
        <li><em>"List all books"</em></li>
        <li><em>"Show registered readers"</em></li>
        <li><em>"What is the average price of books?"</em></li>
        <li><em>"Who reserved B001?"</em></li>
        <li><em>"SELECT * FROM STAFF"</em></li>
      </ul>
    `;
  }
});
