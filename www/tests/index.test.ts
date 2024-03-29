/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/svelte';
import Index from '../src/routes/index.svelte';

describe('Index', () => {
	test('shows content when rendered', () => {
		const { getByText, getByRole } = render(Index);

		const input = getByRole('textbox');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('placeholder', 'Enter room name');

		const button = getByText('Create');
		expect(button).toBeInTheDocument();
	});

	test('sets button link to room name', async () => {
		const { getByText, getByRole } = render(Index);
		const input = getByRole('textbox');
		const button = getByText('Create');

		await fireEvent.input(input, { target: { value: 'test-room-name' } });

		expect(button).toHaveAttribute('href', '/test-room-name');
		expect(button).toHaveAttribute('disabled', 'false');
	});

	test('clicks on button when input change', async () => {
		const { getByText, getByRole } = render(Index);
		const input = getByRole('textbox');
		const button = getByText('Create');

		const onClick = jest.fn();
		button.addEventListener('click', onClick);

		await fireEvent.change(input, { target: { value: 'test-room-name' } });

		expect(onClick).toHaveBeenCalled;
	});

	test('disables button if no room name', () => {
		const { getByText } = render(Index);
		const button = getByText('Create');

		expect(button).toHaveAttribute('disabled', 'true');
	});
});
