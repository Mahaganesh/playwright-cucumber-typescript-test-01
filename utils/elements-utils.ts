import { Page, Locator } from 'playwright';

class ElementUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async trigger(element: string): Promise<void> {
        const locator: Locator = this.page.locator(element);
        await locator.waitFor({ state: 'visible', timeout: 30000 });
        await locator.click(); // Click on the element
    }

    async gotoURL(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async fill(element: string, value: string): Promise<void> {
        const locator: Locator = await this.waitForElementToBeVisible(element);
        await locator.fill(value); // Fill the input field with the provided value
    }

    async waitForElementToBeVisible(element: string): Promise<Locator> {
        const locator: Locator = this.page.locator(element);
        await locator.waitFor({ state: 'visible', timeout: 45000 });
        return locator; // Return the locator for further actions
    }

    async waitForElementToHidden(element: string): Promise<void> {
        await this.page.waitForSelector(element, { state: 'detached', timeout: 45000 });
    }

    async elementIsHidden(element: string): Promise<boolean> {
        return this.page.locator(element).isHidden({ timeout: 5000 });
    }

    async elementIsDisabled(element: string): Promise<boolean> {
        return this.page.locator(element).isDisabled({ timeout: 2000 });
    }

    async elementIsVisible(element: string): Promise<boolean> {
        const locator: Locator = this.page.locator(element);
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        return locator.isVisible(); // Already returns a boolean
    }

    async getTextContent(element: string): Promise<string | null> {
        return this.page.locator(element).textContent({ timeout: 20000 });
    }

    async getAttributeValue(element: string, attribute: string): Promise<string | null> {
        return this.page.locator(element).getAttribute(attribute); // Fixed to use locator
    }

    async getElementInputValue(element: string): Promise<string> {
        return this.page.locator(element).inputValue();
    }

    async getCursorFocusedElement(element: string): Promise<boolean> {
        const locator: Locator = this.page.locator(element);
        const isFocused: boolean = await locator.evaluate(field => field === document.activeElement);
        return isFocused; // Return true if the element is focused
    }

    async navigateTo(link: string): Promise<void> {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
            this.page.click(link)
        ]);
    }

    async onHover(element: string): Promise<void> {
        await this.page.locator(element).hover({ timeout: 5000 });
    }

    async uploadFiles(element: string, value: string | string[]): Promise<void> {
        await this.page.setInputFiles(element, value);
    }
}

export default ElementUtil;
