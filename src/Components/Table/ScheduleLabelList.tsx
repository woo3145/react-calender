import { useEffect, useRef, useState } from 'react';
import { ISchedule } from '../../Context/scheduleContext';
import { useSchedule } from '../../hooks/useSchedule';
import { getDateTerm, isSameDay } from '../../utils/dateUtils';
import ScheduleLabel from './ScheduleLabel';
import ScheduleMoreLabelList from './ScheduleMoreLabelList';

interface Props {
  containerDate: Date;
  containerIdx: number;
}

const ScheduleLabelList = ({ containerDate, containerIdx }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0); // 달력 한칸의 길이

  const { getContainerSchedule } = useSchedule();
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  useEffect(() => {
    setSchedules(getContainerSchedule(containerDate));
  }, [containerDate, getContainerSchedule]);

  useEffect(() => {
    if (!ref.current) return;
    setContainerWidth(ref.current.offsetWidth);
  }, []);

  const maxExpandableContainer = 6 - containerDate.getDay(); // 현재 칸에서 옆으로 최대로 늘릴 수 있는 칸
  return (
    <div className="absolute left-0 right-0" ref={ref}>
      {schedules.map((schedule, idx) => {
        if (2 <= idx) return null;
        // // 이벤트의 시작일과 해당 컨테이너의 값이 일치하는지 확인
        // const isScheduleStartDay = isSameDay(schedule.startDate, containerDate);

        // // 일정 당일 x && 해당칸이 일요일이 아닌데 이벤트가 존재하면 빈공간임
        // const isEmptyPlace =
        //   !isScheduleStartDay && containerDate.getDay() !== 0;

        // // 현재칸을 기준으로 일정이 끝나는 날까지 남은 간격 계산 (다음주로 넘어갈 경우를 위함, 빈공간일 경우 계산 x)
        // const relativeTerm = isEmptyPlace
        //   ? 0
        //   : getDateTerm(containerDate, schedule.endDate);
        // // 현재칸부터 이어질 일정의 길이 (늘릴 수 있는 최대칸까지 자름)
        // const term =
        //   maxExpandableContainer < relativeTerm
        //     ? maxExpandableContainer
        //     : relativeTerm;
        // // 캘린더의 각칸을 term과 곱하여 일정스티커의 실제 길이를 구해줌 +(border에서 손실이 생기기 때문에 보강)
        // const labelWidth =
        //   containerWidth * (term + 1) + (schedule.term === 0 ? 0 : term * 3);
        return <ScheduleLabel key={idx} schedule={schedule} />;
      })}
      {2 < schedules.length ? (
        <>
          <ScheduleMoreLabelList
            schedules={schedules}
            containerDate={containerDate}
          />
        </>
      ) : null}
    </div>
  );
};
export default ScheduleLabelList;
