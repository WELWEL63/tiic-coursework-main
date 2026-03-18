-- ROLES
CREATE TABLE roles (
    role_id         SERIAL PRIMARY KEY,
    role_name       VARCHAR(100) NOT NULL UNIQUE,   -- example :'MaintenanceEngineer'
    access_key      VARCHAR(50)  NOT NULL,          -- example: 'engineer', 'security', 'admin'
    twofa_required  BOOLEAN      NOT NULL DEFAULT FALSE,
    description     VARCHAR(255)
);

-- ACCOUNT STATUS (for users)-- ROLES
CREATE TABLE roles (
    role_id         SERIAL PRIMARY KEY,
    role_name       VARCHAR(100) NOT NULL UNIQUE,   -- example :'MaintenanceEngineer'
    access_key      VARCHAR(50)  NOT NULL,          -- example: 'engineer', 'security', 'admin'
    twofa_required  BOOLEAN      NOT NULL DEFAULT FALSE,
    description     VARCHAR(255)
);

-- ACCOUNT STATUS (for users)
CREATE TABLE account_status (
    status_id       SERIAL PRIMARY KEY,
    status_name     VARCHAR(50)  NOT NULL UNIQUE,   -- example: 'Active', 'Locked', 'Suspended'
    description     VARCHAR(255)
);

-- USERS
CREATE TABLE users (
    user_id             SERIAL PRIMARY KEY,
    first_name          VARCHAR(100) NOT NULL,
    last_name           VARCHAR(100) NOT NULL,
    email               VARCHAR(255) NOT NULL UNIQUE,
    password_hash       VARCHAR(255) NOT NULL,      -- example: hashed password only
    role_id             INT          NOT NULL REFERENCES roles(role_id),
    status_id           INT          NOT NULL REFERENCES account_status(status_id),

    twofa_enabled       BOOLEAN      NOT NULL DEFAULT FALSE,
    twofa_secret        VARCHAR(255),               -- example: for TOTP OR null if using email codes
    last_login_at       TIMESTAMP,
    failed_login_count  INT          NOT NULL DEFAULT 0,
    locked_until        TIMESTAMP,                  -- example: for temporary lockouts (FR22)[file:6]

    created_at          TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- OPTIONAL: USER SECURITY EVENTS (for FR20–FR21 / NFR4)[file:6]
CREATE TABLE user_security_events (
    event_id       SERIAL PRIMARY KEY,
    user_id        INT REFERENCES users(user_id),
    event_type     VARCHAR(50) NOT NULL,            -- example: 'LOGIN_SUCCESS','LOGIN_FAILED','LOCKED'
    event_detail   VARCHAR(255),
    ip_address     VARCHAR(45),
    created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE account_status (
    status_id       SERIAL PRIMARY KEY,
    status_name     VARCHAR(50)  NOT NULL UNIQUE,   -- example: 'Active', 'Locked', 'Suspended'
    description     VARCHAR(255)
);

-- USERS
CREATE TABLE users (
    user_id             SERIAL PRIMARY KEY,
    first_name          VARCHAR(100) NOT NULL,
    last_name           VARCHAR(100) NOT NULL,
    middle_name         VARCHAR(100),
    email               VARCHAR(255) NOT NULL UNIQUE,
    password_hash       VARCHAR(255) NOT NULL,      -- hashed password only
    role_id             INT          NOT NULL REFERENCES roles(role_id),
    status_id           INT          NOT NULL REFERENCES account_status(status_id),

    twofa_enabled       BOOLEAN      NOT NULL DEFAULT FALSE,
    twofa_secret        VARCHAR(255),               -- for TOTP OR null if using email codes
    last_login_at       TIMESTAMP,
    failed_login_count  INT          NOT NULL DEFAULT 0,
    locked_until        TIMESTAMP,                  -- for temporary lockouts (FR22)[file:6]

    created_at          TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- OPTIONAL: USER SECURITY EVENTS (for FR20–FR21 / NFR4)[file:6]
CREATE TABLE user_security_events (
    event_id       SERIAL PRIMARY KEY,
    user_id        INT REFERENCES users(user_id),
    event_type     VARCHAR(50) NOT NULL,            -- 'LOGIN_SUCCESS','LOGIN_FAILED','LOCKED'
    event_detail   VARCHAR(255),
    ip_address     VARCHAR(45),
    created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);
