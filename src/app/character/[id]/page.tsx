import Equipment from "@/components/equipment";
import Stats from "@/components/stats";
import { getBasicCharacterInfo } from "@/util/service";

export default async function Page({ params }: { params: { id: string } }) {
  const characterBasicInfoResponse = await getBasicCharacterInfo(params.id);

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
      {characterBasicInfoResponse == undefined ? (
        <div>
          <div role="status" className="animate-pulse mb-5">
            {rows}
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div>Character Name: {characterBasicInfoResponse.characterName}</div>
          <div>Character Level: {characterBasicInfoResponse.level}</div>
          <div>Job Name: {characterBasicInfoResponse.jobName}</div>
          <div>Advancement: {characterBasicInfoResponse.jobGrowName}</div>
          <div>Account Name: {characterBasicInfoResponse.adventureName}</div>
          <div>Guild Name: {characterBasicInfoResponse.guildName}</div>
        </div>
      )}

      <div className="text-2xl p-5">Equipment</div>

      <Equipment charId={params.id} />
      <Stats charId={params.id}/>
    </div>
  );
}
