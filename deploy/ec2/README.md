# Deploy on AWS EC2 (Ubuntu 24.04 LTS)

This setup runs the Express API and built React site in one Node.js process,
with Nginx as the public reverse proxy and SQLite stored outside the app
directory. It does not create AWS resources or configure a domain for you.

## 1. Prepare AWS

1. Launch an Ubuntu Server 24.04 LTS EC2 instance. Use an instance size suitable
   for your expected traffic and an EBS volume large enough for the database,
   uploads, and backups.
2. In the instance security group, allow SSH (TCP 22) only from your
   administrator IP, and HTTP (TCP 80) and HTTPS (TCP 443) from the internet.
   Do not expose port 4000 or SQLite files.
3. Associate a stable public IP and point your domain's DNS A records at it.

## 2. Install system packages and Node.js

Connect over SSH, then install Nginx, Git, and Node.js 22 LTS using the
official Node.js installation instructions for Ubuntu. Confirm `node --version`
is 22.x and that Node is installed at `/usr/bin/node` (the systemd unit uses
that path).

```bash
sudo apt update
sudo apt install -y nginx git
```

## 3. Install and build the application

Create a dedicated service account and application directories:

```bash
sudo adduser --system --group --home /opt/luangme-hospital luangme-hospital
sudo install -d -o luangme-hospital -g luangme-hospital /opt/luangme-hospital
sudo install -d -o luangme-hospital -g luangme-hospital /opt/luangme-hospital/uploads
```

Clone the repository into `/opt/luangme-hospital` (or copy a release there),
then build both packages:

```bash
cd /opt/luangme-hospital
npm ci --prefix backend
npm ci --prefix frontend
cd backend
DATABASE_URL=file:/var/lib/luangme-hospital/luangme-hospital.db ./node_modules/.bin/prisma generate --schema=../prisma/schema.prisma
npm run build
cd ..
npm --prefix frontend run build
sudo chown -R root:luangme-hospital /opt/luangme-hospital
sudo chown -R luangme-hospital:luangme-hospital /opt/luangme-hospital/uploads
sudo install -d -o luangme-hospital -g luangme-hospital /var/lib/luangme-hospital
```

Run `npm ci` again when deploying a new release that changes either lockfile.
Build on the EC2 host so Prisma installs the correct Linux engine.

## 4. Configure production environment and initialize SQLite

Create a root-owned environment file. Replace the domain and email, and
generate two different random secrets with `openssl rand -hex 32`. Choose a
unique initial admin password of at least 16 characters.

```bash
sudo install -d -m 0750 /etc/luangme-hospital
sudoedit /etc/luangme-hospital/production.env
```

Add these entries (without quotes):

```ini
NODE_ENV=production
PORT=4000
DATABASE_URL=file:/var/lib/luangme-hospital/luangme-hospital.db
CLIENT_URL=https://example.com
JWT_SECRET=REPLACE_WITH_A_RANDOM_SECRET
SESSION_SECRET=REPLACE_WITH_A_DIFFERENT_RANDOM_SECRET
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=REPLACE_WITH_A_UNIQUE_PASSWORD_OF_AT_LEAST_16_CHARACTERS
INITIAL_ADMIN_NAME=Hospital Administrator
```

Restrict access to this file:

```bash
sudo chown root:root /etc/luangme-hospital/production.env
sudo chmod 600 /etc/luangme-hospital/production.env
```

Create the schema and initial administrator before starting the service:

```bash
sudo systemd-run --wait --pipe --unit=luangme-initial-setup \
  --property=User=luangme-hospital \
  --property=WorkingDirectory=/opt/luangme-hospital/backend \
  --property=EnvironmentFile=/etc/luangme-hospital/production.env \
  /bin/bash -c './node_modules/.bin/prisma db push --schema=../prisma/schema.prisma && /usr/bin/node dist/scripts/ensureInitialAdmin.js'
```

After the administrator is created, remove the three `INITIAL_ADMIN_*` lines
from the environment file with `sudoedit`. Keep the admin password in a
password manager; do not commit it or put it in deployment scripts.

For later releases, back up the SQLite database before applying a Prisma schema
change. Review the change and run `prisma db push` with the production
`DATABASE_URL` before restarting the service. Do not use `prisma migrate dev`
in production.

## 5. Configure systemd and Nginx

Install and enable the application service:

```bash
sudo cp /opt/luangme-hospital/deploy/ec2/luangme-hospital.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now luangme-hospital
sudo systemctl status luangme-hospital
```

Configure Nginx with your actual domain:

```bash
sudo cp /opt/luangme-hospital/deploy/ec2/nginx.conf.example /etc/nginx/sites-available/luangme-hospital
sudoedit /etc/nginx/sites-available/luangme-hospital
sudo ln -s /etc/nginx/sites-available/luangme-hospital /etc/nginx/sites-enabled/luangme-hospital
sudo nginx -t
sudo systemctl reload nginx
```

Remove the default Nginx site if it conflicts. Visit the domain over HTTP and
confirm the site loads and `/health` returns a JSON status.

## 6. Enable HTTPS and verify

Once DNS resolves to the instance and HTTP works, install Certbot using the
official Certbot instructions for Ubuntu/Nginx, then request certificates for
the domain names configured in Nginx. Certbot will configure HTTPS and
certificate renewal.

Check service logs with:

```bash
sudo journalctl -u luangme-hospital -n 100 --no-pager
```

Keep regular, tested backups of `/var/lib/luangme-hospital/` and
`/opt/luangme-hospital/uploads/`. Use encrypted EBS snapshots or another
approved backup target; the database and uploads contain hospital data.
