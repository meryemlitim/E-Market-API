import fs from 'fs';
import path from 'path';

const logger = (req, res, next) => {
  const now = new Date().toLocaleString();
  const logMessage = `[${req.method}] ${req.originalUrl} - ${now}\n`;

  const logFilePath = path.join(process.cwd(), 'logs.txt'); // You can change this path if needed

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      // fallback if logging to file fails
      console.error('Failed to write log:', err);
    }
  });

  next();
};

export default logger;
