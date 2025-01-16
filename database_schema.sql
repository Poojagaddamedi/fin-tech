-- Create database
CREATE DATABASE financial_platform;
USE financial_platform;

-- Companies master table
CREATE TABLE companies (
    company_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL,
    company_symbol VARCHAR(50) NOT NULL,
    logo_url TEXT,
    sector VARCHAR(255),
    industry VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Company overview table
CREATE TABLE company_overview (
    overview_id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT,
    market_cap TEXT,
    current_price TEXT,
    high_52w TEXT,
    low_52w TEXT,
    p_e_ratio TEXT,
    book_value TEXT,
    dividend_yield TEXT,
    roce TEXT,
    roe TEXT,
    face_value TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

-- Balance sheet table
CREATE TABLE balance_sheet (
    balance_id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT,
    year INT,
    total_assets TEXT,
    total_liabilities TEXT,
    equity_capital TEXT,
    reserves TEXT,
    borrowings TEXT,
    other_liabilities TEXT,
    fixed_assets TEXT,
    current_assets TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

-- Profit and loss table
CREATE TABLE profit_loss (
    pl_id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT,
    year INT,
    revenue TEXT,
    expenses TEXT,
    operating_profit TEXT,
    net_profit TEXT,
    eps TEXT,
    dividend_payout TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
); 