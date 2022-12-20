## Calender

#### 해야할일

###### 일정표시

- [x] 하루
- [x] 여러날
- [ ] 3개 이상부터 +more 기능
- [ ] 스티커가 dom의 크기변화를 감지하여 스티커의 크기를 조절해야함

현재 : EventsContext의 mockData -> 각 tableItem에서 모든 일정들에서 자신의 칸에 포함되는 이벤트를 필터하여 표시하는중

- 최대 6\*7개의 칸이 모든 일정을 순회하여 찾기 때문에 성능저하 가능성
- [ ] table생성 컴포넌트에서 1차로 1달 반분(-7일, 이번달, +7일)의 이벤트만 미리 필터하여 반복횟수 줄이기

###### DB

- [x] local storage를 db처럼 사용
- [x] 일정 추가
- [x] 일정 삭제
- [x] 일정 수정
- [x] 일정 관련 ui

###### 그외

- [x] 일정 태그 객체화 (color, name 등등) 태그수정시 schedule 객체에 모두 적용해야 되서 schedule객체에 name만 저장
- [x] 태그 filter
