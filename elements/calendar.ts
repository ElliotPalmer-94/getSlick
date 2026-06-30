import { Page, Locator } from '@playwright/test';

export class CalendarPage {
    readonly page: Page;

    readonly menu: Locator;
    readonly new: Locator;
    readonly appointment: Locator;
    readonly walkIn: Locator;
    readonly colour: Locator;
    readonly testService: Locator;
    readonly selectStylist: Locator;
    readonly stylistJosh: Locator;
    readonly selectTime: Locator;
    readonly morningTimeSlot: Locator;
    readonly afternoonTimeSlot: Locator;
    readonly eveningTimeSlot: Locator;
    readonly saveBooking: Locator;
    readonly checkout: Locator;

    constructor(page: Page) {
        this.page = page;

        // Menu locators
        this.menu = page.getByRole('button', { name: 'MENU' });
        this.new = page.locator('[data-tag="SchedulerHeader__button-new"]');
        this.appointment = page.locator('[data-testid="SchedulerHeaderGatedAddAppointmentItem.Content"]');

        // New booking locators
        this.walkIn = page.locator('[data-bem="SearchableDropdown"]')
            .getByRole('button', { name: 'Walk In' });

        this.colour = page.locator('[data-bem="CategoryItem"]')
            .filter({ hasText: 'Colour' });

        this.testService = page.locator('[data-bem="ServiceItem"]')
            .filter({ hasText: 'Test' });

        this.selectStylist = page.locator('.staff-button-right')
            .filter({ hasText: 'Select Stylist' });

        this.stylistJosh = page.locator('.the-stylist-button')
            .filter({ hasText: 'Josh' })

        this.selectTime = page.locator('[data-bem="DropdownService__start-time-info"]')
            .filter({ hasText: 'Select Time' })

        this.morningTimeSlot = page.locator('[data-bem="TimeSlot"]')
            .getByRole('button', { name: 'Morning' });

        this.afternoonTimeSlot = page.locator('[data-bem="TimeSlot"]')
            .getByRole('button', { name: 'Afternoon' });

        this.eveningTimeSlot = page.locator('[data-bem="TimeSlot"]')
            .getByRole('button', { name: 'Evening' });

        this.saveBooking = page.locator('[data-testid="BookingSummaryFooter"]')
            .getByRole('button', { name: 'SAVE BOOKING' })

        // Booking slot locator
        this.checkout = page.getByRole('button', { name: 'CHECKOUT' });
    }

    async goto() {
        await this.page.goto('https://staging-salon.getslick.com/salon/#/salon/28161/day/today');
    }

    confirmedBooking(time: string, service?: string) {
        let confirmedBookingElemnet = this.page
            .locator('[data-bem="ScheduleProcedure__appointment"]')
            .filter({ hasText: time });

        if (service) {
            confirmedBookingElemnet = confirmedBookingElemnet.filter({ hasText: service });
        }

        return confirmedBookingElemnet.last();
    }

    getTimeSlot(timeKey: string) {
        return this.page.locator(`[data-slot-key="${timeKey}"]`);
    }

    private getTimeCategory(timeKey: string) {
        const [h, m] = timeKey.split(':').map(Number);
        const minutes = h * 60 + m;

        const morningEnd = 11 * 60 + 45;
        const afternoonEnd = 17 * 60 + 45;

        if (minutes <= morningEnd) return 'morning';
        if (minutes <= afternoonEnd) return 'afternoon';
        return 'evening';
    }

    async selectBookingTime(timeKey: string) {
        const category = this.getTimeCategory(timeKey);
        const isVisible = await this.getTimeSlot(timeKey).isVisible();

        if (!isVisible) {
            if (category === 'morning') {
                await this.morningTimeSlot.click();
            } else if (category === 'afternoon') {
                await this.afternoonTimeSlot.click();
            } else {
                await this.eveningTimeSlot.click();
            }
        }

        await this.getTimeSlot(timeKey).click();
    }

    async walkInBooking(timeKey: string) {
        await this.new.click();
        await this.appointment.click();
        await this.walkIn.click();
        await this.colour.click();
        await this.testService.click();
        await this.selectStylist.click();
        await this.stylistJosh.click();
        await this.selectTime.click();
        await this.selectBookingTime(timeKey);
        await this.saveBooking.click();
    }

}