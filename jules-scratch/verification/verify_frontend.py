from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        # Navigate directly to the Admin Dashboard
        page.goto("http://localhost:3000/admin")

        # Verify we are on the admin dashboard
        expect(page.get_by_role("heading", name="Admin Dashboard")).to_be_visible()

        # Verify the links to the new pages are present
        expect(page.get_by_role("link", name="Manage Blood Stock")).to_be_visible()
        expect(page.get_by_role("link", name="Manage Requests")).to_be_visible()
        expect(page.get_by_role("link", name="Manage Donors")).to_be_visible()

        # Take a screenshot of the admin dashboard
        page.screenshot(path="jules-scratch/verification/admin_dashboard.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
