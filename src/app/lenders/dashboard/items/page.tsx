import { getAllItems, findAllItems } from "@/app/utils/database/item.query";
import ItemsPage from "./ItemsPage";
import { Item } from "@prisma/client";
export default async function page({
	searchParams,
}: {
	searchParams: Promise<{ search: string }>;
}) {
	const { search } = await searchParams;
	let items: Item[];
	if (search) {
		items = await findAllItems({
			name: search,
			description: search,
		});
	} else {
		items = await getAllItems();
	}
	return (
		<div>
			<ItemsPage items={items} search={search} />
		</div>
	);
}
