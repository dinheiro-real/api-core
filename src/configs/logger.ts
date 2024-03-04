const { createLogger, format, transports } = require("winston");
 
export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console({})],
});