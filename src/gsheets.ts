import * as dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

export async function getData() {
	const SHEET_ID = process.env.SHEET_ID!;
	const auth = await google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
	});
	const sheets = google.sheets({ version: 'v4', auth });

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: 'Sheet1!A2:M2',
	});

	const data = response.data.values;
	if (!data || data.length === 0) {
		console.log('no data found');
		return [];
	}

	return data;
}
