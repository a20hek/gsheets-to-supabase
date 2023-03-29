import { getData } from './src/gsheets';
import { supabase } from './src/supabase';

async function main() {
	const data = await getData();

	if (!data || data.length === 0) {
		console.log('no data found');
		return;
	}

	const parsedData: object[] = data.map((row) => {
		return {
			name: row[0],
			tagline: row[1],
			description: row[2],
			categories: row[6].split(',').map((category: string) => category.trim()),
			status: row[7],
			website: row[8],
			twitter: row[9],
			discord: row[10],
			telegram: row[11],
		};
	});

	const { error } = await supabase.from('projects').insert(parsedData);

	if (error) {
		console.error(error);
		return;
	}

	console.log('done');
}

main();
