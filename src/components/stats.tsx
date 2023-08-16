import { getStats } from "@/util/service";
import * as Models from "@/util/models";

function Buff({ buffs }: { buffs: Models.Buff[] }) {
  return (
    <>
      {buffs.map((value, key) => (
        <div key={key} className="bg-slate-800 rounded-3xl m-2 p-4">
          <p className="bg-slate-500 w-fit rounded-lg p-1">
            Buff: {value.name}
          </p>
          {value.level ? (
            <p className="bg-slate-600 w-fit rounded-lg p-1">
              Level: {value.level}
            </p>
          ) : (
            <></>
          )}
          {value.status.map((value2, key2) => (
            <div key={key2} className="bg-slate-700 w-fit rounded-lg p-1">
              {value2.name}: {value2.value}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

const statSplit = [0, 8, 16, 23, 31, 47, 66];

function Stat({ stats }: { stats: Models.Status2[] }) {

  const statsArr = [
    stats.slice(statSplit[0], statSplit[1]),
    stats.slice(statSplit[1], statSplit[2]),
    stats.slice(statSplit[2], statSplit[3]),
    stats.slice(statSplit[3], statSplit[4]),
    stats.slice(statSplit[4], statSplit[5]),
    stats.slice(statSplit[5], statSplit[6]),
  ];

  return (
    <div className="bg-slate-800 rounded-3xl m-2 w-fit p-2">
      {statsArr.map((v, i) => (
        <div key={i} className="my-3 p-1 flex flex-row flex-wrap">
          {v.map((value, key) => (
            <div key={key} className="bg-slate-600 w-fit rounded-lg p-1 m-2">
              {value.name}: {value.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default async function Stats({ charId }: { charId: string }) {
  const info = await getStats(charId);

  return (
    <div className="flex flex-row">
      <div className="basis-1/2">
        <Buff buffs={info.buff} />
      </div>

      <div className="basis-1/2">
        <Stat stats={info.status} />
      </div>
    </div>
  );
}
