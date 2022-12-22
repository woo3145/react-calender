import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { v4 } from 'uuid';
import { getDateTerm } from '../../utils/dateUtils';
import { ScheduleContextDispatch } from '../../Context/scheduleContext';
import { LabelContextState } from '../../Context/labelContext';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import ko from 'date-fns/locale/ko';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 40,
  },
};
type FormData = {
  title: string;
  calenderType: string;
};

const AddScheduleModal = ({ isOpen, closeModal }: Props) => {
  const { addSchedule } = useContext(ScheduleContextDispatch);
  const { labels } = useContext(LabelContextState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [range, setRange] = useState<DateRange | undefined>();

  const onSubmit = handleSubmit((data) => {
    if (!range?.from) return;
    const startDate = range.from;
    const endDate = range.to ? range.to : range.from;
    addSchedule({
      id: v4(),
      label: data.calenderType,
      title: data.title,
      startDate,
      endDate,
      term: getDateTerm(startDate, endDate),
    });

    closeModal();
  });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="w-screen max-w-screen-sm">
        <h2 className="text-xl font-semibold">일정 추가</h2>
        <form className="mt-4" onSubmit={onSubmit}>
          <div className="flex ">
            <div className="w-full pt-8">
              <label className="block text-md font-medium text-slate-700">
                제목
              </label>
              <input
                {...register('title', { required: true })}
                placeholder="title"
                className="mt-2 px-3 py-2 text-lg w-full rounded-md border border-slate-400"
              />
              {errors.title?.type === 'required' && (
                <p className="mt-1 text-sm text-red-500">
                  제목을 입력해주세요.
                </p>
              )}

              <label className="mt-2 block text-md font-medium text-slate-700">
                타입
              </label>
              <select
                {...register('calenderType')}
                className="mt-2 px-3 py-2 text-lg w-full rounded-md border border-slate-400"
              >
                {labels.map((label, idx) => {
                  return (
                    <option key={idx} value={label.name}>
                      {label.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <DayPicker
                mode="range"
                defaultMonth={range?.from}
                selected={range}
                onSelect={setRange}
                locale={ko}
              />
            </div>
          </div>

          <div className="text-right pt-10">
            <button
              className="px-8 py-2 bg-purple-600 text-white rounded-md 
          cursor-pointer hover:bg-purple-700 duration-200 mr-4"
            >
              추가
            </button>
            <button
              onClick={closeModal}
              className="px-8 py-2 border border-neutral-400 text-neutral-600 rounded-md 
          cursor-pointer hover:border-neutral-600 duration-200"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AddScheduleModal;
