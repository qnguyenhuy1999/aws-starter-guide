import type { Stage } from "@/types/guide";
import { stagesS0S1 } from "./stages-s0-s1";
import { stagesS2S3 } from "./stages-s2-s3";
import { stagesS4S5 } from "./stages-s4-s5";
import { stagesS6S7 } from "./stages-s6-s7";

export const stagesPart1: Stage[] = [
  ...stagesS0S1,
  ...stagesS2S3,
  ...stagesS4S5,
  ...stagesS6S7,
];
