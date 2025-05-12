const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins (for development - be more specific in production)
app.use(cors());

// Or, enable CORS for a specific origin:
// app.use(cors({ origin: 'http://your-client-domain.com' }));

// ... your routes ...

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});