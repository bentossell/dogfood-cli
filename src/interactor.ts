import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';
import type { ActionRecord } from './types';

function randomString(): string {
  return faker.lorem.words({ min: 1, max: 3 });
}

function getInputValue(type: string, nameHint: string): string {
  const hint = nameHint.toLowerCase();
  if (type === 'email' || hint.includes('email')) return faker.internet.email();
  if (type === 'password') return faker.internet.password({ length: 12 });
  if (type === 'tel' || hint.includes('phone')) return faker.phone.number();
  if (type === 'url') return faker.internet.url();
  if (type === 'number' || hint.includes('age') || hint.includes('count')) return String(faker.number.int({ min: 1, max: 99 }));
  if (type === 'date') return faker.date.soon().toISOString().slice(0, 10);
  if (hint.includes('first')) return faker.person.firstName();
  if (hint.includes('last')) return faker.person.lastName();
  if (hint.includes('name')) return faker.person.fullName();
  if (hint.includes('city')) return faker.location.city();
  if (hint.includes('country')) return faker.location.country();
  if (hint.includes('address')) return faker.location.streetAddress();
  return `${faker.person.firstName()} ${randomString()}`;
}

export async function interactWithPage(page: Page, timeout: number): Promise<ActionRecord[]> {
  const actions: ActionRecord[] = [];

  const forms = await page.locator('form').all();
  for (let i = 0; i < forms.length; i++) {
    const form = forms[i];
    const fields = await form.locator('input, textarea, select').all();

    for (const field of fields) {
      try {
        const tagName = (await field.evaluate((el) => el.tagName.toLowerCase())) as string;
        const inputType = ((await field.getAttribute('type')) || '').toLowerCase();
        const nameHint = ((await field.getAttribute('name')) || (await field.getAttribute('id')) || '').toLowerCase();

        if (tagName === 'select') {
          const options = await field.locator('option').all();
          if (options.length > 1) {
            const value = await options[1].getAttribute('value');
            if (value) {
              await field.selectOption(value);
              actions.push({ type: 'fill', target: `select:${nameHint || 'unnamed'}`, detail: `Selected option ${value}`, success: true, timestamp: new Date().toISOString() });
            }
          }
          continue;
        }

        if (inputType === 'hidden' || inputType === 'submit' || inputType === 'button' || inputType === 'file') continue;

        if (inputType === 'checkbox' || inputType === 'radio') {
          await field.check({ timeout: 1000 });
          actions.push({ type: 'fill', target: `${inputType}:${nameHint || 'unnamed'}`, detail: 'Checked option', success: true, timestamp: new Date().toISOString() });
          continue;
        }

        const value = getInputValue(inputType || 'text', nameHint);
        await field.fill(value, { timeout: 1000 });
        actions.push({ type: 'fill', target: `${tagName}:${nameHint || 'unnamed'}`, detail: `Filled ${inputType || 'text'} field`, success: true, timestamp: new Date().toISOString() });
      } catch (error) {
        actions.push({ type: 'fill', target: 'field', detail: `Failed to fill field: ${error instanceof Error ? error.message : String(error)}`, success: false, timestamp: new Date().toISOString() });
      }
    }

    try {
      const submit = form.locator('button[type="submit"], input[type="submit"]').first();
      if ((await submit.count()) > 0) {
        await submit.click({ timeout: 2000 });
        await page.waitForLoadState('networkidle', { timeout: Math.min(timeout, 4000) }).catch(() => undefined);
        actions.push({ type: 'submit', target: `form-${i + 1}`, detail: 'Submitted form', success: true, timestamp: new Date().toISOString() });
      }
    } catch (error) {
      actions.push({ type: 'submit', target: `form-${i + 1}`, detail: `Submit attempt failed: ${error instanceof Error ? error.message : String(error)}`, success: false, timestamp: new Date().toISOString() });
    }
  }

  const buttons = await page.locator('button').all();
  for (let i = 0; i < Math.min(buttons.length, 5); i++) {
    const button = buttons[i];
    try {
      const text = ((await button.innerText()) || '').trim().slice(0, 80);
      if (/submit|login|sign in|register|delete|remove/i.test(text)) continue;
      await button.click({ timeout: 1500 });
      await page.waitForLoadState('networkidle', { timeout: Math.min(timeout, 3000) }).catch(() => undefined);
      actions.push({ type: 'click', target: `button:${text || `#${i + 1}`}`, detail: 'Clicked button', success: true, timestamp: new Date().toISOString() });
    } catch (error) {
      actions.push({ type: 'click', target: `button#${i + 1}`, detail: `Failed click: ${error instanceof Error ? error.message : String(error)}`, success: false, timestamp: new Date().toISOString() });
    }
  }

  return actions;
}
