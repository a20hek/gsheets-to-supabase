import { getData } from './src/gsheets';
import { supabase } from './src/supabase';

async function main() {
	const data = await getData();
	console.log(data);
}

main();
