import { Header } from "@/components/organisms/Header";
import { ListSection } from "@/components/organisms/ListSection";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getLoggedInUser();

  if(!user){
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <ListSection />
    </main>
  )
}
