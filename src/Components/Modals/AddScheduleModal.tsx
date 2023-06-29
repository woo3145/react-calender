import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { v4 } from 'uuid';
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
    });

    closeModal();
  });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="w-screen max-w-screen-sm px-2 lg:px-0">
        <h2 className="text-xl font-semibold">일정 추가</h2>
        <form className="mt-4" onSubmit={onSubmit}>
          <div className="lg:flex">
            <div className="w-full lg:pt-8">
              <label className="block font-medium text-md text-slate-700">
                제목
              </label>
              <input
                {...register('title', { required: true })}
                placeholder="title"
                className="w-full px-3 py-2 mt-2 text-lg border rounded-md border-slate-400"
              />
              {errors.title?.type === 'required' && (
                <p className="mt-1 text-sm text-red-500">
                  제목을 입력해주세요.
                </p>
              )}

              <label className="block mt-2 font-medium text-md text-slate-700">
                타입
              </label>
              <select
                {...register('calenderType')}
                className="w-full px-3 py-2 mt-2 text-lg border rounded-md border-slate-400"
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
            <div className="flex justify-center mt-4 lg:mt-0">
              <DayPicker
                mode="range"
                defaultMonth={range?.from}
                selected={range}
                onSelect={setRange}
                locale={ko}
              />
            </div>
          </div>

          <div className="pt-10 text-right">
            <button className="px-8 py-2 mr-4 text-white duration-200 bg-purple-600 rounded-md cursor-pointer hover:bg-purple-700">
              추가
            </button>
            <button
              onClick={closeModal}
              className="px-8 py-2 duration-200 border rounded-md cursor-pointer border-neutral-400 text-neutral-600 hover:border-neutral-600"
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
