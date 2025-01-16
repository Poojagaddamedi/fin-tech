document.addEventListener('DOMContentLoaded', function() {
    const companySelector = document.getElementById('companySelector');
    const loadingSpinner = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    // Function to show loading spinner
    function showLoading() {
        loadingSpinner.classList.remove('d-none');
        errorMessage.classList.add('d-none');
    }

    // Function to hide loading spinner
    function hideLoading() {
        loadingSpinner.classList.add('d-none');
    }

    // Function to show error
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }

    // Function to fetch company overview
    async function fetchCompanyOverview(companyId) {
        showLoading();
        try {
            const response = await fetch(`api/overview.php?company_id=${companyId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayCompanyData(data);
        } catch (error) {
            console.error('Error fetching company data:', error);
            showError('Failed to load company data. Please try again later.');
        } finally {
            hideLoading();
        }
    }

    // Function to display company data
    function displayCompanyData(data) {
        const headerDiv = document.getElementById('company-header');
        const metricsDiv = document.getElementById('company-metrics');

        // Display company header
        headerDiv.innerHTML = `
            <div class="d-flex align-items-center">
                ${data.logo_url ? `<img src="${data.logo_url}" alt="${data.company_name}" class="me-3" style="height: 50px;">` : ''}
                <div>
                    <h2>${data.company_name}</h2>
                    <p class="text-muted mb-0">${data.sector} | ${data.industry}</p>
                </div>
            </div>
        `;

        // Display financial metrics
        const metrics = [
            { label: 'Market Cap', value: data.market_cap },
            { label: 'Current Price', value: data.current_price },
            { label: '52 Week High', value: data.high_52w },
            { label: '52 Week Low', value: data.low_52w },
            { label: 'P/E Ratio', value: data.p_e_ratio },
            { label: 'Book Value', value: data.book_value },
            { label: 'Dividend Yield', value: data.dividend_yield },
            { label: 'ROCE', value: data.roce },
            { label: 'ROE', value: data.roe }
        ];

        metricsDiv.innerHTML = metrics.map(metric => `
            <div class="col-md-4 mb-3">
                <div class="financial-metric">
                    <div class="metric-label">${metric.label}</div>
                    <div class="metric-value">${metric.value || 'N/A'}</div>
                </div>
            </div>
        `).join('');
    }

    // Event listener for company selection
    companySelector.addEventListener('change', (e) => {
        const companyId = e.target.value;
        if (companyId) {
            fetchCompanyOverview(companyId);
        }
    });

    // Load initial company list (you'll need to create this API endpoint)
    async function loadCompanies() {
        try {
            const response = await fetch('api/companies.php');
            const companies = await response.json();
            
            companies.forEach(company => {
                const option = document.createElement('option');
                option.value = company.company_id;
                option.textContent = company.company_name;
                companySelector.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading companies:', error);
            showError('Failed to load company list');
        }
    }

    // Initialize the page
    loadCompanies();
}); 