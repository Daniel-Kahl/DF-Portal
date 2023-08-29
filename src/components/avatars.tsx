// Avatar should also include creature
import * as Models from "@/util/models";
import { getAvatar } from "@/util/service";
import { getCreature } from "@/util/service";
import Image from "next/image";

const rarityColors = new Map<string, string>([
  ["Common", "#FFFFFF"],
  ["Uncommon", "#68D5ED"],
  ["Rare", "#B36BFF"],
  ["Unique", "#FF00FF"],
  ["Epic", "#FFB400"],
  ["Chronicle", "#FF6666"],
  ["Legendary", "#FF7800"],
  ["Mythic", "#FFB400"],
]);

export default async function Avatar({ charId }: { charId: string }) {
  const Avatar = await getAvatar(charId);
  return (
    <div>
      {Avatar.avatar.map((avatar, index) => (
        <Avatars key={index} avatars={avatar} />
      ))}
    </div>
  );
}

function Avatars({ avatars }: { avatars: Models.Avatar }) {
  return (
    <div style={{ color: rarityColors.get(`${avatars.itemRarity}`) }}>
      <BaseAvatarImage baseAvatarImage={avatars} />
      <AvatarImage avatarImage={avatars.clone} />
      {avatars.slotName}, {avatars.optionAbility}
      <div>
        emblems:
        {avatars.emblems.map((avatar, index) => (
          <Emblem key={index} emblems={avatar} />
        ))}
      </div>
    </div>
  );
}

function BaseAvatarImage({
  baseAvatarImage,
}: {
  baseAvatarImage: Models.Avatar;
}) {
  return (
    <div className="flex-shrink-0 m-1">
      <Image
        src={"https://img-api.dfoneople.com/df/items/" + baseAvatarImage.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
    </div>
  );
}

function AvatarImage({ avatarImage }: { avatarImage: Models.Clone }) {
  return (
    <div className="flex-shrink-0 m-1">
      <Image
        src={"https://img-api.dfoneople.com/df/items/" + avatarImage.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
    </div>
  );
}

function Emblem({ emblems }: { emblems: Models.Emblem }) {
  return <div>{emblems.itemName}</div>;
}
