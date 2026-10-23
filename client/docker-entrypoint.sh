#!/bin/sh
set -eu
# Schema migrations/seeding are deliberate release operations. Restarts only
# launch the immutable build and never generate migrations or replace data.
exec node server.js
