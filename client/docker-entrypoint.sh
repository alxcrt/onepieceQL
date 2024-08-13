#!/bin/bash

# https://dev.to/mattishida/a-gotcha-with-nextjs-production-builds-in-docker-compose-2232
# Docker entrypoints
# Can't we just use the depends_on directive in the Docker compose file? depends_on says "don't start A without first starting B." And, yes, we want to make sure the backend service starts first. But there's a bit more to it.

# We also need to make sure that the Next.js build happens after the backend starts. depends_on establishes a start dependency, not a build dependency. We could solve our problem if there were a Docker compose directive to say "don't build A without first starting B", but as far as I know there isn't.

# What we can do is separate building the frontend Docker image from building the statically generated site. That way depends_on will ensure that the Next.js build happens at the right time.

# The easiest way I found to do this is with a simple docker-entrypoint.sh file. Entrypoints are scripts for specifying commands to run when a container starts up. Exactly what we need! The hard part was just realizing the Next.js build could happen on container start not on image build.

# Database setup
npm run db:generate
npm run db:migrate

# Seed the database
npm run db:seed

# # Build the Next site including SSG
# npm run build

# # Start the production server
# npm run start

# Start the development server
npm run dev