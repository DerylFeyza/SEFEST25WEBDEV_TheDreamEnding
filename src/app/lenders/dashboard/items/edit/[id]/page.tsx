import ItemForm from "../../components/item-form";
import { findItem } from "@/app/utils/database/item.query";
import { nextGetServerSession } from "@/lib/next-auth";
export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const session = await nextGetServerSession();
	const items = await findItem({ id: id, owner_id: session!.user!.id });

	return (
		<div>
			<ItemForm initialData={items} />
		</div>
	);
}
