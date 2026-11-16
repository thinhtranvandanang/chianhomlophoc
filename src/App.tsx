import { useMemo, useState } from 'react';
import {
  Check,
  Copy,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  RefreshCw,
  Shuffle,
  Trash2,
  Users,
} from 'lucide-react';
import { GroupCard } from './components/GroupCard';
import {
  DEFAULT_SAMPLE_GROUPS,
  DEFAULT_STUDENTS,
  DisplayScale,
  DivisionMode,
  GroupResult,
  describePlannedDistribution,
  divideStudentsIntoGroups,
  formatGroupsForClipboard,
  parseStudentList,
} from './utils/grouping';

export default function App() {
  const [rawInput, setRawInput] = useState<string>(() => DEFAULT_STUDENTS.join('\n'));
  const [mode, setMode] = useState<DivisionMode>('byGroupCount');
  const [countInput, setCountInput] = useState<string>('4');
  const [groups, setGroups] = useState<GroupResult[]>(() => DEFAULT_SAMPLE_GROUPS);
  const [roundKey, setRoundKey] = useState<number>(0);
  const [isSampleState, setIsSampleState] = useState<boolean>(true);
  const [displayScale, setDisplayScale] = useState<DisplayScale>('large');
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const students = useMemo(() => parseStudentList(rawInput), [rawInput]);

  const numericCount = useMemo(() => {
    const parsed = parseInt(countInput, 10);
    if (Number.isNaN(parsed) || parsed < 1) return 1;
    return Math.min(200, parsed);
  }, [countInput]);

  const plannedSummary = useMemo(
    () => describePlannedDistribution(students.length, mode, numericCount),
    [students.length, mode, numericCount]
  );

  const totalMembersInResults = useMemo(
    () => groups.reduce((sum, g) => sum + g.members.length, 0),
    [groups]
  );

  const handleModeChange = (nextMode: DivisionMode) => {
    setMode(nextMode);
    setValidationError(null);
    if (nextMode === 'byMemberCount' && numericCount > 12) {
      setCountInput('4');
    }
  };

  const handleStepCount = (delta: number) => {
    const nextVal = Math.max(1, Math.min(200, numericCount + delta));
    setCountInput(String(nextVal));
    setValidationError(null);
  };

  const handleDivide = (ensureDifferent: boolean) => {
    if (students.length === 0) {
      setValidationError('Vui lòng dán hoặc nhập ít nhất 1 tên sinh viên vào khung danh sách.');
      return;
    }

    const safeCount = numericCount;
    setCountInput(String(safeCount));

    const nextGroups = divideStudentsIntoGroups(
      students,
      mode,
      safeCount,
      ensureDifferent ? groups : undefined
    );

    setGroups(nextGroups);
    setRoundKey((prev) => prev + 1);
    setIsSampleState(false);
    setValidationError(null);
    setCopied(false);
  };

  const handleClearInput = () => {
    setRawInput('');
    setValidationError(null);
  };

  const handleRestoreSample = () => {
    setRawInput(DEFAULT_STUDENTS.join('\n'));
    setMode('byGroupCount');
    setCountInput('4');
    setGroups(DEFAULT_SAMPLE_GROUPS);
    setRoundKey((prev) => prev + 1);
    setIsSampleState(true);
    setValidationError(null);
  };

  const handleCopyResults = async () => {
    if (groups.length === 0) return;
    const text = formatGroupsForClipboard(groups);
    setCopyError(null);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (ok) {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2500);
        } else {
          setCopyError('Không thể tự động sao chép. Vui lòng thử lại.');
        }
      } catch {
        setCopyError('Trình duyệt không cho phép truy cập bộ nhớ tạm.');
      }
    }
  };

  const gridColsClass = useMemo(() => {
    const count = groups.length;
    if (isProjectorMode) {
      if (count <= 2) return 'grid-cols-1 md:grid-cols-2';
      if (count === 3) return 'grid-cols-1 md:grid-cols-3';
      if (count === 4 && displayScale !== 'xlarge') return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';
      if (displayScale === 'xlarge') return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }

    if (count === 1) return 'grid-cols-1 max-w-2xl';
    if (count <= 4 || displayScale === 'xlarge') return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3';
  }, [groups.length, isProjectorMode, displayScale]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar: Clean 2-3 zone single-row header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <span className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            Chia Nhóm Lớp Học
          </span>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsProjectorMode((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isProjectorMode
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {isProjectorMode ? (
                <>
                  <Minimize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Hiện bảng nhập liệu</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Chế độ trình chiếu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Two-Zone Classroom Workspace */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Left Control Panel: Student List + Division Settings */}
          {!isProjectorMode && (
            <aside className="w-full lg:w-[390px] xl:w-[420px] shrink-0 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col gap-6">
              {/* Student list textarea section */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <label
                    htmlFor="student-list-input"
                    className="font-display text-base font-bold text-slate-900"
                  >
                    Danh sách sinh viên
                  </label>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-semibold tabular-nums text-indigo-700">
                      {students.length} người
                    </span>
                    {rawInput.trim().length > 0 ? (
                      <button
                        type="button"
                        onClick={handleClearInput}
                        className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600 font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Xóa</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRestoreSample}
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Nạp danh sách mẫu
                      </button>
                    )}
                  </div>
                </div>

                <textarea
                  id="student-list-input"
                  value={rawInput}
                  onChange={(e) => {
                    setRawInput(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  rows={11}
                  placeholder={
                    'Dán danh sách tên sinh viên vào đây, mỗi dòng một người...\nVí dụ:\nNguyễn Văn An\nTrần Thị Bình\nLê Hoàng Cường'
                  }
                  className="w-full min-h-[260px] rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-3 text-base text-slate-900 placeholder:text-slate-400 leading-relaxed focus:bg-white focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 resize-y"
                />

                <p className="text-xs text-slate-500 leading-relaxed">
                  Mỗi dòng một sinh viên. Các dòng trống sẽ tự động được bỏ qua.
                </p>
              </div>

              <hr className="border-slate-200" />

              {/* Division mode & numeric settings */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-800">Hình thức chia</span>
                  <div
                    role="radiogroup"
                    aria-label="Hình thức chia nhóm"
                    className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={mode === 'byGroupCount'}
                      onClick={() => handleModeChange('byGroupCount')}
                      className={`px-3 py-2.5 text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        mode === 'byGroupCount'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Theo số nhóm
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={mode === 'byMemberCount'}
                      onClick={() => handleModeChange('byMemberCount')}
                      className={`px-3 py-2.5 text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        mode === 'byMemberCount'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Theo số người/nhóm
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="group-number-input"
                    className="text-sm font-semibold text-slate-800"
                  >
                    {mode === 'byGroupCount' ? 'Số nhóm cần chia' : 'Số người mỗi nhóm'}
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Giảm số lượng"
                      onClick={() => handleStepCount(-1)}
                      disabled={numericCount <= 1}
                      className="w-11 h-11 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
                    >
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <input
                      id="group-number-input"
                      type="number"
                      min={1}
                      max={200}
                      value={countInput}
                      onChange={(e) => {
                        setCountInput(e.target.value);
                        setValidationError(null);
                      }}
                      onBlur={() => {
                        setCountInput(String(numericCount));
                      }}
                      className="flex-1 h-11 rounded-lg border border-slate-300 bg-white px-3 text-center font-mono text-lg font-semibold tabular-nums text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />

                    <button
                      type="button"
                      aria-label="Tăng số lượng"
                      onClick={() => handleStepCount(1)}
                      className="w-11 h-11 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-xs font-medium text-slate-600 tabular-nums">
                    {plannedSummary}
                  </p>
                </div>
              </div>

              {validationError && (
                <div
                  role="alert"
                  className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-800"
                >
                  {validationError}
                </div>
              )}

              <button
                type="button"
                onClick={() => handleDivide(false)}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-lg bg-indigo-600 px-5 py-3 text-base font-bold text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 whitespace-nowrap"
              >
                <Shuffle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Chia nhóm</span>
              </button>
            </aside>
          )}

          {/* Right Stage: Projector-Ready Group Result Cards */}
          <section
            aria-label="Kết quả chia nhóm"
            className="flex-1 w-full min-w-0 flex flex-col gap-6"
          >
            {/* Results Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex flex-col gap-1">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {isSampleState ? 'Danh sách nhóm mẫu' : 'Kết quả chia nhóm'}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-slate-600 tabular-nums">
                  <span>{groups.length} nhóm</span>
                  <span aria-hidden="true">·</span>
                  <span>{totalMembersInResults} sinh viên</span>
                  <span aria-hidden="true">·</span>
                  <span>Chênh lệch tối đa 1 người</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {/* Projector Font Scale Switcher */}
                <div
                  role="group"
                  aria-label="Cỡ chữ trình chiếu"
                  className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
                >
                  {(
                    [
                      { key: 'medium', label: 'Vừa' },
                      { key: 'large', label: 'Lớn' },
                      { key: 'xlarge', label: 'Rất lớn' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setDisplayScale(item.key)}
                      className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        displayScale === item.key
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Re-divide Button */}
                <button
                  type="button"
                  onClick={() => handleDivide(true)}
                  className="min-h-[42px] inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <RefreshCw className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Chia lại</span>
                </button>

                {/* Copy Results Button */}
                <button
                  type="button"
                  onClick={handleCopyResults}
                  disabled={groups.length === 0}
                  className={`min-h-[42px] inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed ${
                    copied
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Sao chép kết quả</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {copyError && (
              <div
                role="alert"
                className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900"
              >
                {copyError}
              </div>
            )}

            {/* Group Cards Grid */}
            {groups.length > 0 ? (
              <div className={`grid gap-5 lg:gap-6 items-stretch ${gridColsClass}`}>
                {groups.map((group, idx) => (
                  <GroupCard
                    key={`${roundKey}-${group.id}`}
                    group={group}
                    index={idx}
                    displayScale={displayScale}
                    roundKey={roundKey}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center flex flex-col items-center gap-3">
                <Users className="w-10 h-10 text-slate-400" aria-hidden="true" />
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Chưa có nhóm nào được tạo
                </h2>
                <p className="text-base text-slate-600 max-w-md">
                  Hãy dán danh sách sinh viên vào khung bên trái và nhấn nút Chia nhóm để bắt đầu.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
