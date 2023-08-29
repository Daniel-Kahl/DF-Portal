import Equipment from "@/components/equipment";
import Stats from "@/components/stats";
import Insignia from "@/components/insignia";
import CharacterInfo from "@/components/basicinfo";
import CharacterTabs from "@/components/characterTabs";
import Avatar from "@/components/avatars";

export default async function Page({ params }: { params: { id: string } }) {
  const rows = [];
  for (let i = 0; i < 7; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<div className="h-7 rounded-full bg-gray-700 w-1/2 mb-1"></div>);
  }

  return (
    <div className="container mx-auto max-w-2xl m-10">
      <div className="text-2xl p-5">Basic Character Information</div>
      <hr />
      <CharacterInfo charId={params.id} />
      <div className="text-2xl p-5">Equipment</div>
      <CharacterTabs
        charId={params.id}
        stats={<Stats charId={params.id} />}
        insignia={<Insignia charId={params.id} />}
        avatar={<Avatar charId={params.id} />}
      />
    </div>
  );
}
