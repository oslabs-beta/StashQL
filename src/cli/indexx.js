#! /usr/bin/env node
const { program } = require("commander");
const stashCLI = require("./logs");
const fs = require("fs");
const path = require("path");

program
  .command("all logs")
  .description("List all the logs")
  .action(() => {
    stashCLI.logAll();
  });

program
  .command("clear logs")
  .description("Clears all the logs")
  .action(() => {
    stashCLI.clearLog();
  });

program.parse(process.argv);
