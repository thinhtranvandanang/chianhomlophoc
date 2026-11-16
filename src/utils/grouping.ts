export type DivisionMode = 'byGroupCount' | 'byMemberCount';
export type DisplayScale = 'medium' | 'large' | 'xlarge';

export interface GroupResult {
  id: number;
  name: string;
  members: string[];
}

export interface GroupTheme {
  name: string;
  cardBg: string;
  cardBorder: string;
  headerBg: string;
  headerBorder: string;
  titleColor: string;
  countColor: string;
  indexColor: string;
  rowDivider: string;
}

export const GROUP_THEMES: GroupTheme[] = [
  {
    name: 'Xanh dương',
    cardBg: 'bg-blue-50/75',
    cardBorder: 'border-blue-200',
    headerBg: 'bg-blue-100/80',
    headerBorder: 'border-blue-200',
    titleColor: 'text-blue-900',
    countColor: 'text-blue-700',
    indexColor: 'text-blue-600',
    rowDivider: 'border-blue-200/60',
  },
  {
    name: 'Xanh ngọc',
    cardBg: 'bg-emerald-50/75',
    cardBorder: 'border-emerald-200',
    headerBg: 'bg-emerald-100/80',
    headerBorder: 'border-emerald-200',
    titleColor: 'text-emerald-900',
    countColor: 'text-emerald-700',
    indexColor: 'text-emerald-600',
    rowDivider: 'border-emerald-200/60',
  },
  {
    name: 'Vàng hổ phách',
    cardBg: 'bg-amber-50/80',
    cardBorder: 'border-amber-200',
    headerBg: 'bg-amber-100/80',
    headerBorder: 'border-amber-200',
    titleColor: 'text-amber-950',
    countColor: 'text-amber-800',
    indexColor: 'text-amber-700',
    rowDivider: 'border-amber-200/60',
  },
  {
    name: 'Tím oải hương',
    cardBg: 'bg-violet-50/75',
    cardBorder: 'border-violet-200',
    headerBg: 'bg-violet-100/80',
    headerBorder: 'border-violet-200',
    titleColor: 'text-violet-900',
    countColor: 'text-violet-700',
    indexColor: 'text-violet-600',
    rowDivider: 'border-violet-200/60',
  },
  {
    name: 'Hồng san hô',
    cardBg: 'bg-rose-50/75',
    cardBorder: 'border-rose-200',
    headerBg: 'bg-rose-100/80',
    headerBorder: 'border-rose-200',
    titleColor: 'text-rose-900',
    countColor: 'text-rose-700',
    indexColor: 'text-rose-600',
    rowDivider: 'border-rose-200/60',
  },
  {
    name: 'Xanh lam',
    cardBg: 'bg-cyan-50/75',
    cardBorder: 'border-cyan-200',
    headerBg: 'bg-cyan-100/80',
    headerBorder: 'border-cyan-200',
    titleColor: 'text-cyan-900',
    countColor: 'text-cyan-700',
    indexColor: 'text-cyan-600',
    rowDivider: 'border-cyan-200/60',
  },
  {
    name: 'Cam ấm',
    cardBg: 'bg-orange-50/75',
    cardBorder: 'border-orange-200',
    headerBg: 'bg-orange-100/80',
    headerBorder: 'border-orange-200',
    titleColor: 'text-orange-950',
    countColor: 'text-orange-700',
    indexColor: 'text-orange-600',
    rowDivider: 'border-orange-200/60',
  },
  {
    name: 'Chàm',
    cardBg: 'bg-indigo-50/75',
    cardBorder: 'border-indigo-200',
    headerBg: 'bg-indigo-100/80',
    headerBorder: 'border-indigo-200',
    titleColor: 'text-indigo-900',
    countColor: 'text-indigo-700',
    indexColor: 'text-indigo-600',
    rowDivider: 'border-indigo-200/60',
  },
  {
    name: 'Xanh lá mạ',
    cardBg: 'bg-lime-50/75',
    cardBorder: 'border-lime-200',
    headerBg: 'bg-lime-100/80',
    headerBorder: 'border-lime-200',
    titleColor: 'text-lime-950',
    countColor: 'text-lime-800',
    indexColor: 'text-lime-700',
    rowDivider: 'border-lime-200/60',
  },
  {
    name: 'Tím hồng',
    cardBg: 'bg-fuchsia-50/75',
    cardBorder: 'border-fuchsia-200',
    headerBg: 'bg-fuchsia-100/80',
    headerBorder: 'border-fuchsia-200',
    titleColor: 'text-fuchsia-900',
    countColor: 'text-fuchsia-700',
    indexColor: 'text-fuchsia-600',
    rowDivider: 'border-fuchsia-200/60',
  },
];

export const DEFAULT_STUDENTS: string[] = [
  'Nguyễn Minh Anh',
  'Trần Quốc Bảo',
  'Lê Thị Ngọc Bích',
  'Phạm Hoàng Dũng',
  'Hoàng Gia Hân',
  'Vũ Đức Khang',
  'Đặng Thu Lan',
  'Bùi Quang Minh',
  'Đỗ Phương Nhi',
  'Ngô Tuấn Phát',
  'Dương Khánh Quỳnh',
  'Lý Thanh Sơn',
  'Phan Thảo Trang',
  'Trương Hải Đăng',
  'Võ Ngọc Uyên',
  'Hồ Trọng Vinh',
];

export const DEFAULT_SAMPLE_GROUPS: GroupResult[] = [
  {
    id: 1,
    name: 'Nhóm 1',
    members: ['Nguyễn Minh Anh', 'Hoàng Gia Hân', 'Đỗ Phương Nhi', 'Phan Thảo Trang'],
  },
  {
    id: 2,
    name: 'Nhóm 2',
    members: ['Trần Quốc Bảo', 'Vũ Đức Khang', 'Ngô Tuấn Phát', 'Trương Hải Đăng'],
  },
  {
    id: 3,
    name: 'Nhóm 3',
    members: ['Lê Thị Ngọc Bích', 'Đặng Thu Lan', 'Dương Khánh Quỳnh', 'Võ Ngọc Uyên'],
  },
  {
    id: 4,
    name: 'Nhóm 4',
    members: ['Phạm Hoàng Dũng', 'Bùi Quang Minh', 'Lý Thanh Sơn', 'Hồ Trọng Vinh'],
  },
];

export function parseStudentList(rawText: string): string[] {
  return rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function computeTargetGroupCount(
  studentCount: number,
  mode: DivisionMode,
  inputValue: number
): number {
  if (studentCount <= 0) return 0;
  const sanitized = Number.isFinite(inputValue) ? Math.floor(inputValue) : 1;
  const safeVal = Math.max(1, sanitized);

  if (mode === 'byGroupCount') {
    return Math.min(safeVal, studentCount);
  }

  return Math.max(1, Math.ceil(studentCount / safeVal));
}

function fisherYatesShuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function distributeBalanced(shuffled: string[], groupCount: number): GroupResult[] {
  if (groupCount <= 0 || shuffled.length === 0) return [];

  const total = shuffled.length;
  const baseSize = Math.floor(total / groupCount);
  const remainder = total % groupCount;

  const groups: GroupResult[] = [];
  let cursor = 0;

  for (let i = 0; i < groupCount; i++) {
    const size = baseSize + (i < remainder ? 1 : 0);
    const members = shuffled.slice(cursor, cursor + size);
    cursor += size;
    groups.push({
      id: i + 1,
      name: `Nhóm ${i + 1}`,
      members,
    });
  }

  return groups;
}

function serializeGrouping(groups: GroupResult[]): string {
  // Compare sorted member sets per group when >1 group so "Chia lại" changes actual group composition
  if (groups.length > 1) {
    return groups
      .map((g) => [...g.members].sort((a, b) => a.localeCompare(b, 'vi')).join('|'))
      .join('||');
  }
  return groups.map((g) => g.members.join('|')).join('||');
}

export function divideStudentsIntoGroups(
  students: string[],
  mode: DivisionMode,
  inputValue: number,
  previousGroups?: GroupResult[]
): GroupResult[] {
  const groupCount = computeTargetGroupCount(students.length, mode, inputValue);
  if (groupCount === 0) return [];

  const prevSignature = previousGroups ? serializeGrouping(previousGroups) : null;
  let candidate = distributeBalanced(fisherYatesShuffle(students), groupCount);

  if (prevSignature && students.length >= 2) {
    const maxAttempts = 25;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (serializeGrouping(candidate) !== prevSignature) {
        break;
      }
      candidate = distributeBalanced(fisherYatesShuffle(students), groupCount);
    }
  }

  return candidate;
}

export function formatGroupsForClipboard(groups: GroupResult[]): string {
  return groups
    .map((group) => {
      const header = `${group.name} (${group.members.length} thành viên):`;
      const memberLines = group.members.map((member, idx) => `${idx + 1}. ${member}`);
      return [header, ...memberLines].join('\n');
    })
    .join('\n\n');
}

export function describePlannedDistribution(
  studentCount: number,
  mode: DivisionMode,
  inputValue: number
): string {
  if (studentCount === 0) return 'Chưa có sinh viên trong danh sách.';
  const groupCount = computeTargetGroupCount(studentCount, mode, inputValue);
  const baseSize = Math.floor(studentCount / groupCount);
  const remainder = studentCount % groupCount;

  if (remainder === 0) {
    return `Dự kiến: ${groupCount} nhóm, mỗi nhóm ${baseSize} sinh viên.`;
  }

  return `Dự kiến: ${groupCount} nhóm (${remainder} nhóm ${baseSize + 1} người, ${groupCount - remainder} nhóm ${baseSize} người).`;
}
