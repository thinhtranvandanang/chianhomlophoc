import { motion } from 'motion/react';
import { DisplayScale, GROUP_THEMES, GroupResult } from '../utils/grouping';

interface GroupCardProps {
  group: GroupResult;
  index: number;
  displayScale: DisplayScale;
  roundKey: number;
}

const SCALE_CLASSES: Record<
  DisplayScale,
  {
    headerPadding: string;
    bodyPadding: string;
    title: string;
    count: string;
    member: string;
    memberIndex: string;
    rowGap: string;
  }
> = {
  medium: {
    headerPadding: 'px-5 py-3.5',
    bodyPadding: 'px-5 py-4',
    title: 'text-xl font-bold tracking-tight',
    count: 'text-sm font-medium tabular-nums',
    member: 'text-lg font-medium leading-snug',
    memberIndex: 'text-sm font-mono tabular-nums w-6 shrink-0',
    rowGap: 'py-2',
  },
  large: {
    headerPadding: 'px-6 py-4',
    bodyPadding: 'px-6 py-4',
    title: 'text-2xl font-bold tracking-tight',
    count: 'text-base font-semibold tabular-nums',
    member: 'text-xl font-semibold leading-snug',
    memberIndex: 'text-base font-mono tabular-nums w-7 shrink-0',
    rowGap: 'py-2.5',
  },
  xlarge: {
    headerPadding: 'px-7 py-5',
    bodyPadding: 'px-7 py-5',
    title: 'text-3xl font-extrabold tracking-tight',
    count: 'text-lg font-semibold tabular-nums',
    member: 'text-2xl font-semibold leading-snug',
    memberIndex: 'text-lg font-mono tabular-nums w-8 shrink-0',
    rowGap: 'py-3',
  },
};

export function GroupCard({ group, index, displayScale, roundKey }: GroupCardProps) {
  const theme = GROUP_THEMES[index % GROUP_THEMES.length];
  const scale = SCALE_CLASSES[displayScale];

  return (
    <motion.article
      key={`${roundKey}-${group.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.18,
        delay: Math.min(index * 0.025, 0.15),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex flex-col rounded-xl border ${theme.cardBorder} ${theme.cardBg} overflow-hidden`}
    >
      <header
        className={`flex items-baseline justify-between gap-4 border-b ${theme.headerBorder} ${theme.headerBg} ${scale.headerPadding}`}
      >
        <h3 className={`font-display ${scale.title} ${theme.titleColor} whitespace-nowrap`}>
          {group.name}
        </h3>
        <span className={`${scale.count} ${theme.countColor} whitespace-nowrap shrink-0`}>
          {group.members.length} thành viên
        </span>
      </header>

      <ol className={`flex flex-col ${scale.bodyPadding}`}>
        {group.members.map((member, memberIdx) => (
          <li
            key={`${group.id}-${memberIdx}-${member}`}
            className={`flex items-baseline gap-2.5 ${scale.rowGap} ${
              memberIdx < group.members.length - 1 ? `border-b ${theme.rowDivider}` : ''
            }`}
          >
            <span className={`${scale.memberIndex} ${theme.indexColor} select-none`}>
              {memberIdx + 1}.
            </span>
            <span className={`${scale.member} text-slate-900 break-words`}>{member}</span>
          </li>
        ))}
      </ol>
    </motion.article>
  );
}
