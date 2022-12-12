import { useEffect, useRef, useState } from 'react';
import { IEvent } from '../../Context/eventsContext';

interface Props {
  viewedEvents: IEvent[];
  containerDate: Date;
}

const TableEventItem = ({ viewedEvents, containerDate }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    setWidth(ref.current.offsetWidth);
  }, []);

  const maxCount = 7 - containerDate.getDay(); // 현재 칸에서 옆으로 최대로 늘릴 수 있는 칸

  return (
    <div className="absolute left-0 right-0" ref={ref}>
      {viewedEvents.map((event, idx) => {
        // 현재칸을 기준으로 일정이 끝나는 날까지 남은 간격 계산
        const relativeTerm =
          (event.endDate.getTime() - containerDate.getTime()) / 86400000;
        // 현재칸부터 이어질 일정의 길이
        const term = maxCount < relativeTerm ? maxCount : relativeTerm + 1;

        // 캘린더의 각칸을 term과 곱하여 일정스티커의 실제 길이를 구해줌 +(border에서 손실이 생기기 때문에 보강)
        const w = width * term + (event.term === 0 ? 0 : term * 2);

        const startDay = event.startDate.getTime() === containerDate.getTime();
        // 일정 시작일이 아닌데 일요일 칸일경우 (새 스티커를 만들어서 붙여줘야됨)
        if (!startDay && containerDate.getDay() === 0) {
          return (
            <div
              key={idx}
              style={{
                width: w,
              }}
              className={`w-full border bg-red-200 rounded-md text-xs px-2 h-6 flex items-center cursor-pointer`}
            >
              {event.title}
            </div>
          );
        }
        // 일정 시작일이 아닐경우 (빈칸을 생성하여 다른 스티커들이 아래쪽에 표시되도록 해야함)
        if (!startDay) {
          return <div key={idx} className={`w-full h-6`}></div>;
        }
        //
        return (
          <div
            key={idx}
            style={{
              width: w,
            }}
            className={`w-full border bg-red-200 rounded-md text-xs px-2 h-6 flex items-center cursor-pointer`}
          >
            {event.title}
          </div>
        );
      })}
    </div>
  );
};
export default TableEventItem;
