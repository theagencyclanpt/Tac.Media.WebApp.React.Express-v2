import { BannerConfiguration } from "@/model/BannerConfiguration";
import { GroupBannerConfiguration } from "@/model/GroupBannerConfiguration";
import InstagramAnnouncement from "./instagram.announcement.json";
import GroupAnnouncement from "./group.announcement.json";

export const IndividualConfigurations = [
    InstagramAnnouncement
] as BannerConfiguration[];

export const GroupConfigurations = [
    GroupAnnouncement
] as GroupBannerConfiguration[];