"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattedDate = void 0;
const date_fns_1 = require("date-fns");
const currentDate = new Date();
exports.formattedDate = (0, date_fns_1.format)(currentDate, 'MM/dd/yyyy');
