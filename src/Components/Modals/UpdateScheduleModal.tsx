import { ChangeEvent, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { getDateTerm } from '../../utils/dateUtils';
import {
  ISchedule,
  ScheduleContextDispatch,
} from '../../Context/scheduleContext';
import { LabelContextState } from '../../Context/labelContext';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  schedule: ISchedule;
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
    zIndex: 10,
  },
};
type FormData = {
  title: string;
  calenderType: string;
  startDate: string;
  endDate: string;
};

const UpdateScheduleModal = ({ isOpen, closeModal, schedule }: Props) => {
  const { updateSchedule, removeSchedule } = useContext(
    ScheduleContextDispatch
  );
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: schedule.title,
      calenderType: schedule.label,
    },
  });
  const { labels } = useContext(LabelContextState);

  useEffect(() => {
    const startDate = `${schedule.startDate.getFullYear()}-${
      schedule.startDate.getMonth() + 1
    }-${
      schedule.startDate.getDate() < 10 ? '0' : ''
    }${schedule.startDate.getDate()}`;
    const endDate = `${schedule.endDate.getFullYear()}-${
      schedule.endDate.getMonth() + 1
    }-${
      schedule.endDate.getDate() < 10 ? '0' : ''
    }${schedule.endDate.getDate()}`;

    setValue('startDate', startDate);
    setValue('endDate', endDate);

    // eslint-disable-next-line
  }, []);

  const onSubmit = handleSubmit((data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate.getTime() < startDate.getTime()) {
      return;
    }
    updateSchedule({
      id: schedule.id,
      label: data.calenderType,
      title: data.title,
      startDate,
      endDate,
      term: getDateTerm(startDate, endDate),
    });

    closeModal();
  });

  const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { endDate: _endDate } = watch();
    const startDate = new Date(e.target.value);
    const endDate = new Date(_endDate);
    // 만약 시작일을 마지막일 이후 날짜를 선택하면 둘다 변경
    if (endDate.getTime() < startDate.getTime()) {
      setValue('endDate', e.target.value);
    }
    setValue('startDate', e.target.value);
  };

  const onChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { startDate: _startDate } = watch();
    const startDate = new Date(_startDate);
    const endDate = new Date(e.target.value);
    // 만약 마지막일을 시작일보다 이전 날짜를 선택하면 둘다 변경
    if (endDate.getTime() < startDate.getTime()) {
      setValue('startDate', e.target.value);
    }
    setValue('endDate', e.target.value);
  };

  const onDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      removeSchedule(schedule.id);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="w-screen max-w-screen-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">일정 업데이트</h2>
          <div className="flex">
            <div
              onClick={onDelete}
              className="flex items-center py-2 px-4 rounded-md text-red-500 hover:bg-gray-200 cursor-pointer duration-200"
            >
              <p>삭제</p>
            </div>
          </div>
        </div>
        <form className="mt-4" onSubmit={onSubmit}>
          <label className="block text-md font-medium text-slate-700">
            제목
          </label>
          <input
            {...register('title', { required: true })}
            placeholder="title"
            className="mt-2 px-3 py-2 text-lg w-full rounded-md border border-slate-400"
          />
          {errors.title?.type === 'required' && (
            <p className="mt-1 text-sm text-red-500">제목을 입력해주세요.</p>
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

          <label className="mt-2 block text-md font-medium text-slate-700">
            시작일
          </label>
          <input
            {...register('startDate')}
            onChange={onChangeStartDate}
            type="date"
            className="mt-2"
          />

          <label className="mt-2 block text-md font-medium text-slate-700">
            마지막일
          </label>
          <input
            {...register('endDate')}
            onChange={onChangeEndDate}
            type="date"
            className="mt-2"
          />

          <div className="text-right">
            <button
              className="px-8 py-2 bg-purple-600 text-white rounded-md 
          cursor-pointer hover:bg-purple-700 duration-200 mr-4"
            >
              수정
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

export default UpdateScheduleModal;
