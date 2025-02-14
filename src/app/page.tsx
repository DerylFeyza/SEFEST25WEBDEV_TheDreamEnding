import { Dashboard } from "./components/dashboard"
import { getAllItems } from "@/app/utils/actions/item"

export default async function Home() {
  const items = await getAllItems()
  return <Dashboard items={items} />
}

