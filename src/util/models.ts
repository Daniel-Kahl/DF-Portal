
  // 02. Character ID
  export interface Characters {
    rows: Row[]
  }
  
  export interface Row {
    serverId: string
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    fame: number
  }
  
  // 03. Basic Character Info
  export interface CharacterBasicInfo {
    characterId:   string;
    characterName: string;
    level:         number;
    jobId:         string;
    jobGrowId:     string;
    jobName:       string;
    jobGrowName:   string;
    adventureName: string;
    guildId:       string;
    guildName:     string;
  }

  // 04. Search Character "Stat Information"
  export interface Stat{
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    buff: Buff[]
    status: Status2[]
  }
  
  export interface Buff {
    name: string
    level?: number
    status: Status[]
  }
  
  export interface Status {
    name: string
    value: any
  }
  
  export interface Status2 {
    name: string
    value: number
  }
  
  // 05. Search Character "Equipped Equipment"
  export interface Equipped {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    equipment: Equipment[]
    setItemInfo: any[]
  }
  
  export interface Equipment {
    slotId: string
    slotName: string
    itemId: string
    itemName: string
    itemTypeId: string
    itemType: string
    itemTypeDetailId: string
    itemTypeDetail: string
    itemAvailableLevel: number
    itemRarity: string
    setItemId: any
    setItemName: any
    reinforce: number
    itemGradeName?: string
    enchant?: Enchant
    amplificationName?: any
    refine: number
    growInfo?: GrowInfo
    engraveName?: boolean
    machineRevolutionInfo?: MachineRevolutionInfo
    upgradeInfo?: UpgradeInfo
    ispinsInfo?: IspinsInfo
  }
  
  export interface Enchant {
    status: Status[]
  }
  
  export interface Status {
    name: string
    value: any
  }
  
  export interface GrowInfo {
    transfer?: boolean
    total: Total
    options: Option[]
  }
  
  export interface Total {
    damage: number
    buff: number
    level: number
  }
  
  export interface Option {
    level: number
    expRate: number
    explain: string
    explainDetail: string
    damage: number
    default: Default
    buff: number
  }
  
  export interface Default {
    damage: number
    buff: number
  }
  
  export interface MachineRevolutionInfo {
    options: Option2[]
  }
  
  export interface Option2 {
    buff: number
    explain: string
    explainDetail: string
  }
  
  export interface UpgradeInfo {
    itemId: string
    itemName: string
  }
  
  export interface IspinsInfo {
    options: Option3[]
  }
  
  export interface Option3 {
    buff: number
    explain: string
    explainDetail: string
  }
  
  // 06. Equipped Avatar
  export interface Avatars {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    avatar: Avatar[]
  }
  
  export interface Avatar {
    slotId: string
    slotName: string
    itemId: string
    itemName: string
    itemRarity: string
    clone: Clone
    optionAbility?: string
    emblems: Emblem[]
  }
  
  export interface Clone {
    itemId?: any
    itemName?: any
  }
  
  export interface Emblem {
    slotNo: number
    slotColor: string
    itemName: string
    itemRarity: string
  }
  
  
  // 07. Equipped Creature
  export interface Creatures {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    creature: Creature
  }
  
  export interface Creature {
    itemId: string
    itemName: string
    itemRarity: string
    clone: Clone
    artifact: Artifact[]
  }
  
  export interface Clone {
    itemId?: any
    itemName?: any
  }
  
  export interface Artifact {
    slotColor: string
    itemId: string
    itemName: string
    itemAvailableLevel: number
    itemRarity: string
  }
  
  // 08. Equipped Insignia
  export interface Insignia {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    flag: Flag
  }
  
  export interface Flag {
    itemId: string
    itemName: string
    itemAvailableLevel: number
    itemRarity: string
    reinforce: number
    itemAbility: string
    gems: Gem[]
  }
  
  export interface Gem {
    slotNo: number
    itemId: string
    itemName: string
    itemRarity: string
    itemAbility: string
  }
  
  // 09. Equipped Talisman
  export interface Talismans {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    talismans: Talisman[]
  }
  
  export interface Talisman {
    talisman: Talisman2
    runes: Rune[]
  }
  
  export interface Talisman2 {
    slotNo: number
    itemId: string
    itemName: string
    runeTypes: string[]
  }
  
  export interface Rune {
    slotNo: number
    itemId: string
    itemName: string
  }
  // 10. Skill Style
  export interface Skills {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    skill: Skill
  }
  
  export interface Skill {
    style: Style
  }
  
  export interface Style {
    active: Active[]
    passive: Passive[]
  }
  
  export interface Active {
    skillId: string
    name: string
    level: number
    requiredLevel: number
    costType: string
  }
  
  export interface Passive {
    skillId: string
    name: string
    level: number
    requiredLevel: number
    costType: string
  }
  
  // 11. Buff Enancement Skill Equipped Equipment
  export interface buffEquips {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    skill: Skill
  }
  
  export interface Skill {
    buff: Buff
  }
  
  export interface Buff {
    skillInfo: SkillInfo
    equipment: Equipment[]
  }
  
  export interface SkillInfo {
    skillId: string
    name: string
    option: Option
  }
  
  export interface Option {
    level: number
    desc: string
    values: string[]
  }
  
  export interface Equipment {
    slotId: string
    slotName: string
    itemId: string
    itemName: string
    itemTypeId: string
    itemType: string
    itemTypeDetailId: string
    itemTypeDetail: string
    itemAvailableLevel: number
    itemRarity: string
    setItemId: any
    setItemName: any
    reinforce: number
    amplificationName?: any
    refine: number
  }
  
  // 12. Buff Enchancement Skill Equipped Avatar
  export interface buffAvatars {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    skill: Skill
  }
  
  export interface Skill {
    buff: Buff
  }
  
  export interface Buff {
    skillInfo: SkillInfo
    avatar: any
  }
  
  export interface SkillInfo {
    skillId: string
    name: string
    option: Option
  }
  
  export interface Option {
    level: number
    desc: string
    values: string[]
  }

  // 13. Buff swap creatures
  export interface buffCreatures {
    characterId: string
    characterName: string
    level: number
    jobId: string
    jobGrowId: string
    jobName: string
    jobGrowName: string
    adventureName: string
    guildId: string
    guildName: string
    skill: Skill
  }
  
  export interface Skill {
    buff: Buff
  }
  
  export interface Buff {
    skillInfo: SkillInfo
    creature: any
  }
  
  export interface SkillInfo {
    skillId: string
    name: string
    option: Option
  }
  
  export interface Option {
    level: number
    desc: string
    values: string[]
  }
  