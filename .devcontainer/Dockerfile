FROM mcr.microsoft.com/devcontainers/go:1.22

# Install playwright
RUN go install github.com/playwright-community/playwright-go/cmd/playwright@latest

# Install air for hot reloading
RUN go install github.com/air-verse/air@v1.52.3

# Install additional dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        ca-certificates \
        tzdata \
    && rm -rf /var/lib/apt/lists/*

RUN playwright install --with-deps chromium

#install nodejs 18 and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Install pnpm
RUN npm install -g pnpm

CMD ["sleep", "infinity"]