## Calender

#### 해야할일

###### 일정표시

- [x] 하루
- [x] 여러날
- [x] 3개 이상부터 +more 기능

LocalStorage => ScheduleContext의 state로 관리 => 일정리스트 컴포넌트에서 Hook으로 해당칸에 존재하는 일정들을 필터하여 가져옴

###### 일정 스티커 룰

=> 긴 스티커 구현문제로 표시는 한칸짜리 스티커로 진행함

- 둘째줄에 이어진 스티커의 상태를 추적하기위해 전칸의 상태 추적(자신의 칸과 전칸의 일정들을 받아와서 스티커가 이어지면 일정을 순서에 맞게 고정시키고 나머지 일정들을 남은칸에 넣어줌)
  => 전칸도 그 전칸의 상태를 추적하여 상태가 변경되기 때문에 불가
  (ex. 전칸이 긴스티커를 붙이고 빈공간에 다른 일정을 붙인 새순서를 가진 배열을 만들었지만 같은 층의 컴포넌트이기 때문에 현재 칸에서 그변경을 추적하려고 부모에 다시보내면 무한 리렌더링이 발생함)
  {달력칸을 생성하여 날짜 정보를 주는 객체} => {날짜 정보를 가지고 일정을 불러오는 달력칸}
- 달력의 칸수만큼 map에 해당칸의 소켓2개를 만들어 추적(일정 시작날발견 => 스티커가 표시된 경우 옆칸 소켓의 같은 칸에 추가)
  - 달력의 칸마다 date객체를 가지고 있어서 전달부터 이어진 이벤트를 추적못함
  - 다음주로 넘어갔는데 2째줄 => 1째줄로 표시될 수 있음
  - 시작일이 3째줄로 넘어가서 표시가 안될 경우 그다음 빈 소켓을 찾아서 추가해 줘야하는데 어려움
  - 소켓이 빈 칸에는 다른 이벤트를 붙여줘야하는데 긴 이벤트를 일정하지 않게 배치하면 줄이 3째줄로 넘어가서 끊겼다가 보였다가해서 가시성이 오히려 더 떨어짐

###### DB

- [x] local storage를 db처럼 사용
- [x] 일정 추가
- [x] 일정 삭제
- [x] 일정 수정
- [x] 일정 관련 ui

###### 그외

- [x] 일정 태그 객체화 (color, name 등등) 태그수정시 schedule 객체에 모두 적용해야 되서 schedule객체에 name만 저장
- [x] 태그 filter
- [x] 샘플 일정 데이터 추가
